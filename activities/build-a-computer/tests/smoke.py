"""python3 tests/smoke.py [activity URL]; requires Playwright and Chromium."""
import os
import shutil
import sys
from playwright.sync_api import sync_playwright
URL=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8000/activities/build-a-computer/'
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM') or shutil.which('chromium'),args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':1440,'height':1050})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL)
    page.evaluate('artReady')
    assert page.evaluate('artCache.size')==17
    # Every sprite really is 64x64, with only opaque GPL colours or transparent pixels.
    assert page.evaluate('''() => [...artCache.values()].every(c => {
      if(c.width!==64 || c.height!==64)return false;
      const p=c.getContext('2d').getImageData(0,0,64,64).data;
      for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;
       if(p[i+3]!==255 || !PALETTE.includes([p[i],p[i+1],p[i+2]].map(x=>x.toString(16).padStart(2,'0')).join('')))return false;}
      return true;})''')
    page.screenshot(path='/tmp/club-title.png',full_page=True)
    page.locator('#music').click()
    assert page.locator('#music').get_attribute('aria-pressed')=='true'
    page.locator('#music').click()
    assert page.locator('#music').get_attribute('aria-pressed')=='false'
    page.locator('#begin').click()
    assert page.locator('#next').is_disabled()
    # Looking at an item must not add it. Back retains the current inventory.
    page.locator('[data-part="mouse"]').click()
    assert page.locator('.hero-sprite').get_attribute('width')=='64'
    page.screenshot(path='/tmp/club-discovery.png',full_page=True)
    page.locator('#back').click()
    assert page.locator('[data-part="mouse"]').get_attribute('aria-pressed')=='false'
    def add(part):
        page.locator(f'[data-part="{part}"]').click()
        page.locator('#add').click()
        assert page.locator(f'[data-part="{part}"]').count()==0
        assert page.evaluate('(id)=>added.has(id)',part)
        assert page.locator('.case-contents').count()==0
        page.wait_for_function("!document.querySelector('.flying-part')")
    def build(drive,bonus):
        # Input order is free; CPU and RAM can be added before the motherboard.
        for part in ['mouse','keyboard']:add(part)
        page.locator('#next').click()
        assert page.locator('[data-part="cpu"]').is_enabled()
        assert page.locator('[data-part="rom"], [data-part="bus"]').count()==0
        page.screenshot(path='/tmp/club-processing.png',full_page=True)
        for part in ['cpu','ram','motherboard']:add(part)
        assert page.locator('#next').is_enabled()
        if bonus:
            page.locator('[data-part="gpu"]').click()
            assert 'integrated graphics' in page.locator('.discovery-dialogue').inner_text()
            page.locator('#add').click()
        page.locator('#next').click()
        for part in ['speakers','monitor']:add(part)
        page.locator('#next').click()
        add('external')
        page.locator('[data-part="drive"]').click()
        page.locator('#compare').click()
        assert page.locator('[data-drive]').count()==2
        page.locator(f'[data-drive="{drive}"]').click()
        add('usb')
        page.locator('#next').click()
        assert page.locator('#send').is_disabled()
        page.locator('#connect').click()
        page.locator('#send').click()
        page.locator('#next').click()
        assert page.locator('#shrink').count()==0
        page.locator('#power').click()
        assert 'System started' in page.locator('.boot-status').inner_text()
        assert page.locator('body').evaluate("e=>e.classList.contains('completed')")
        assert page.locator('.completed-build').count()==1
        page.locator('#shrink').click()
        assert 'built-in keyboard' in page.locator('#app .dialogue').inner_text()
        page.screenshot(path='/tmp/club-laptop.png',full_page=True)
        page.locator('#shrink').click()
        assert 'touchscreen' in page.locator('#app .dialogue').inner_text()
        page.locator('#grow').click()
        page.locator('#shrink').click()
    build('ssd',True)
    page.locator('#knowledge').click()
    for answer in [0,1,2,1,2]:
        page.locator(f'[data-answer="{answer}"]').click()
        page.locator('#quiz-next').click()
    assert '5 of 5' in page.locator('.score').inner_text()
    page.locator('#review').click()
    page.locator('[data-review="1"]').click()
    assert 'Random access memory' in page.locator('#review-content').inner_text()
    page.locator('#results').click()
    page.locator('#restart').click()
    page.locator('button[value="cancel"]').click()
    assert page.locator('.score').count()==1
    page.locator('#restart').click()
    page.locator('button[value="restart"]').click()
    page.locator('#begin').click()
    build('hdd',False)
    page.locator('#skip-check').click()
    assert 'All five stages complete' in page.locator('.score').inner_text()
    page.locator('#retry').click()
    page.locator('[data-answer="2"]').click()
    assert 'another look' in page.locator('.quiz-feedback').inner_text()
    assert 'keyboard is an input' in page.locator('.quiz-feedback').inner_text()
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    page.set_viewport_size({'width':390,'height':844})
    page.goto(URL)
    page.evaluate('artReady')
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    page.screenshot(path='/tmp/club-narrow.png',full_page=True)
    page.locator('#begin').click()
    page.locator('[data-part="keyboard"]').click()
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    page.emulate_media(reduced_motion='reduce')
    assert page.locator('.hero-sprite').evaluate('e=>getComputedStyle(e).animationName')=='none'
    assert not errors,errors
    browser.close()
    print('PASS: actual 64x64 sprites; exact GPL pixels; explore-before-add; free component order; both drives; optional GPU; music; startup/shrinking; quiz/review/restart; narrow layout; reduced motion; no JS errors')

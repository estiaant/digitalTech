const PALETTE = ['10121c', '2c1e31', '6b2643', 'ac2847', 'ec273f', '94493a', 'de5d3a', 'e98537', 'f3a833', '4d3533', '6e4c30', 'a26d3f', 'ce9248', 'dab163', 'e8d282', 'f7f3b7', '1e4044', '006554', '26854c', '5ab552', '9de64e', '008b8b', '62a477', 'a6cb96', 'd3eed3', '3e3b65', '3859b3', '3388de', '36c5f4', '6dead6', '5e5b8c', '8c78a5', 'b0a7b8', 'deceed', '9a4d76', 'c878af', 'cc99ff', 'fa6e79', 'ffa2ac', 'ffd1d5', 'f6e8e0', 'ffffff'];
const parts = {
 keyboard: ['Keyboard','Enter letters, numbers, symbols, and instructions into the computer.'],
 mouse: ['Mouse','Control the pointer to select and interact with items in the graphical user interface (GUI).'],
 motherboard: ['Motherboard','The main circuit board connects the components and allows them to communicate.'],
 cpu: ['CPU','The central processing unit executes instructions and performs calculations on data.'],
 ram: ['RAM','Random access memory temporarily holds the programs and data the CPU is using; its contents are lost when power is switched off.'],
 gpu: ['Graphics card','A dedicated graphics card renders images for the display; it can provide more graphics processing capability than integrated graphics.'],
 monitor: ['Monitor','A monitor displays information from the computer as text and images.'],
 speakers: ['Speakers','Speakers produce sound as output from the computer.'],
 drive: ['Internal drive','An HDD or an SSD keeps files and programs even when the computer is switched off.'],
 usb: ['USB flash drive','A removable storage device that uses flash memory and connects to a USB port.'],
 external: ['External hard drive','A hard drive in its own case connects outside the computer to store files.']
};
const stages = [
 {name:'Input',title:'Give your computer instructions.',intro:'Before a computer can do anything with data, we need a way to enter it. Let’s add two input devices.',task:'Select each device to add it to your desk.',ids:['keyboard','mouse'],done:'You can enter data and instructions. Next, let’s add the components that process them.'},
 {name:'Processing',title:'Turn data into information.',intro:'Input devices give us a way to enter data. Inside the system unit, components work together to process it.',task:'Pick any component. Explore first, then add it to your build.',ids:['motherboard','cpu','ram'],done:'The CPU can process data, using RAM as temporary working memory. Next, let’s add a way to see and hear the results.'},
 {name:'Output',title:'See and hear the results.',intro:'The computer can process data. Output devices present the resulting information to us.',task:'Add a monitor and speakers.',ids:['monitor','speakers'],done:'Now you can see and hear the output. But RAM loses its contents when power is off. Let’s add long-term storage.'},
 {name:'Storage',title:'Keep your work for later.',intro:'Secondary storage keeps files and programs when power is switched off. It is different from temporary RAM.',task:'Choose an internal drive, then add two removable storage devices.',ids:['drive','usb','external'],done:'Your files can remain stored after power is off. Finally, let’s explore how computers share data.'},
 {name:'Communication',title:'Share data with other computers.',intro:'Communication is the sending and receiving of data between computers over a network.',task:'Make a simulated network connection, then send your class a file.',ids:[],done:'Your computer can input, process, output, store, and communicate data. Time to see what you remember.'}
];
const questions = [
 {q:'Which device enters letters and numbers into the computer?',options:['Keyboard','Monitor','Speakers'],answer:0,explain:'The keyboard is an input device. The monitor and speakers are output devices.'},
 {q:'What is the difference between RAM and an SSD?',options:['Both lose their contents when power is off.','RAM holds working data temporarily; an SSD keeps saved files.','RAM displays images; an SSD processes instructions.'],answer:1,explain:'RAM is temporary working memory. An SSD is secondary storage that keeps data without power.'},
 {q:'Which component executes instructions and performs calculations?',options:['Motherboard','Hard drive','CPU'],answer:2,explain:'The CPU processes data. The motherboard connects components, and the hard drive stores data.'},
 {q:'A monitor shows your drawing. Which part of the cycle is this?',options:['Input','Output','Communication'],answer:1,explain:'Displaying information on a monitor is output.'},
 {q:'You send a saved file to another computer. Which part of the cycle is this?',options:['Processing','Storage','Communication'],answer:2,explain:'Sending and receiving data between computers is communication.'}
];

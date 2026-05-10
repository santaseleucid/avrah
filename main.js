// ══ Terminal ══
(function() {
  'use strict';
  var output = document.getElementById('terminal-output');
  var input = document.getElementById('terminal-input');
  var termBody = document.getElementById('terminal-body');
  var inputLine = document.getElementById('term-input-line');
  if (!output || !input) return;

  var history = [], historyIdx = -1, gameActive = false;

  var fs = {
    'about.txt':
      'AVRAH — Product Design Studio\nWinnipeg, MB, Canada\n\nFrom the Aramaic "avra" — to create, to build.\n"Avra k\'davra" means "I create as I speak."\nThat\'s where "abracadabra" comes from.\n\nWe took the first word. We don\'t just talk\nabout products. We create them.',
    'stack.txt':
      'FIRMWARE    FreeRTOS, Zephyr, ESP-IDF, nRF Connect\nHARDWARE    ARM Cortex-M, nRF52, ESP32, Custom PCB\nWIRELESS    BLE 5.3, LTE CAT-1, Wi-Fi, LoRa\nCLOUD       AWS IoT Core, MQTT, TLS, OTA\nSOFTWARE    React, TypeScript, Node.js, Django\nSECURITY    Secure Boot, E2E Encryption, Pen Testing',
    'contact.txt':
      'EMAIL    hello@avrah.studio\nGITHUB   github.com/santaseleucid\nLINKEDIN linkedin.com/in/sanjay-abraham\nWEB      avrah.studio',
    'projects.txt':
      '01  Connected Healthcare Gateway    65,000+ units\n02  Rail Condition Analytics         10+ agencies\n03  RailSense IoT Hardware          Custom HW, live rail',
    '.secret':
      '\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\n\u2588                                \u2588\n\u2588  You found the secret file.    \u2588\n\u2588                                \u2588\n\u2588  Try: sudo make me a sandwich  \u2588\n\u2588  Try: avra kadavra             \u2588\n\u2588  Try: rm -rf /                 \u2588\n\u2588                                \u2588\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588',
    '.bashrc':
      '# ~/.bashrc\nexport PS1="visitor@avrah:~$ "\nalias ll="ls -la"\nalias cls="clear"\n# TODO: fix the coffee machine firmware\n# TODO: stop playing snake during standups'
  };

  var fortunes = [
    '"Any sufficiently advanced technology is indistinguishable from magic." \u2014 Arthur C. Clarke',
    '"Hardware eventually fails. Software eventually works." \u2014 Michael Hartung',
    '"The best time to fix a bug is before you ship. The second best time is now."',
    '"In theory, there is no difference between theory and practice. In practice, there is."',
    '"It works on my machine." \u2014 Every firmware engineer, ever.',
    '"The IoT: where your fridge has more uptime than your startup."',
    '"Premature optimization is the root of all evil." \u2014 Donald Knuth',
    '"First, solve the problem. Then, write the code." \u2014 John Johnson',
    '"There are only two hard things: cache invalidation, naming things, and off-by-one errors."',
    '"A good solder joint is like a good handshake \u2014 firm, shiny, and inspires confidence."',
    '"Sleep is just your body\'s OTA update process."',
  ];

  function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function print(text, cls) {
    var d = document.createElement('div');
    if (cls) d.className = cls;
    d.textContent = text;
    output.appendChild(d);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function printH(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    output.appendChild(d);
    termBody.scrollTop = termBody.scrollHeight;
  }

  function printDelayed(lines, delay, cb) {
    inputLine.style.display = 'none';
    var i = 0;
    function next() {
      if (i < lines.length) {
        if (typeof lines[i] === 'string') print(lines[i]);
        else printH(lines[i].h);
        i++;
        setTimeout(next, delay);
      } else {
        inputLine.style.display = 'flex';
        input.focus();
        if (cb) cb();
      }
    }
    next();
  }

  // Welcome
  printH('<span class="t-green t-bold">Avrah Studio Terminal v1.0</span>');
  print("Type 'help' for available commands.", 't-gray');
  print('');

  termBody.addEventListener('click', function() { if (!gameActive) input.focus(); });

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var cmd = input.value; input.value = '';
      handleCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        if (historyIdx === -1) historyIdx = history.length;
        if (historyIdx > 0) { historyIdx--; input.value = history[historyIdx]; }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx >= 0 && historyIdx < history.length - 1) {
        historyIdx++; input.value = history[historyIdx];
      } else { historyIdx = -1; input.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      tabComplete();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      output.innerHTML = '';
    }
  });

  function tabComplete() {
    var val = input.value, parts = val.split(/\s+/);
    var cmds = ['help','ls','cat','pwd','whoami','echo','clear','date','uptime','ping','make','neofetch','cowsay','fortune','snake','matrix','history','sudo','rm','vim','nano','exit','cd','curl','grep','git','coffee','sl'];
    if (parts.length <= 1) {
      var m = cmds.filter(function(c) { return c.indexOf(parts[0]) === 0; });
      if (m.length === 1) input.value = m[0] + ' ';
    } else if (parts[0] === 'cat') {
      var fnames = Object.keys(fs);
      var partial = parts[parts.length - 1];
      var fm = fnames.filter(function(f) { return f.indexOf(partial) === 0; });
      if (fm.length === 1) { parts[parts.length - 1] = fm[0]; input.value = parts.join(' '); }
    }
  }

  function handleCommand(cmd) {
    var trimmed = cmd.trim();
    if (!trimmed) { printH('<span class="t-green">visitor@avrah:~$</span> '); return; }

    history.push(trimmed);
    historyIdx = -1;
    printH('<span class="t-green">visitor@avrah:~$</span> ' + esc(trimmed));

    var parts = trimmed.split(/\s+/);
    var c = parts[0].toLowerCase();
    var args = parts.slice(1);
    var full = trimmed.toLowerCase();

    // Easter egg phrases
    if (full === 'sudo make me a sandwich') { cmdSandwich(); print(''); return; }
    if (full === 'avra kadavra' || full === 'avra kedavra' || full === 'avracadabra') { cmdMagic(); return; }
    if (full.match(/^rm\s+(-rf?\s+)?\//) ) { cmdRmRf(); return; }

    switch(c) {
      case 'help': cmdHelp(); break;
      case 'ls': cmdLs(args); break;
      case 'cat': cmdCat(args); break;
      case 'pwd': print('/home/avrah/studio'); break;
      case 'whoami': print('visitor (with good taste)'); break;
      case 'echo': print(args.join(' ')); break;
      case 'clear': output.innerHTML = ''; break;
      case 'date': print(new Date().toString()); break;
      case 'uptime': cmdUptime(); break;
      case 'ping': cmdPing(args); break;
      case 'make': cmdMake(args); break;
      case 'neofetch': case 'fastfetch': cmdNeofetch(); break;
      case 'cowsay': cmdCowsay(args.join(' ') || 'moo'); break;
      case 'fortune': cmdFortune(); break;
      case 'snake': cmdSnake(); break;
      case 'matrix': cmdMatrix(); break;
      case 'history': cmdHistory(); break;
      case 'sudo': printH('<span class="t-red">Permission denied. Nice try though.</span>'); break;
      case 'rm': printH('<span class="t-red">rm: permission denied (read-only terminal, friend)</span>'); break;
      case 'vim': case 'vi': printH('<span class="t-yellow">You\'d be here forever. Try cat instead.</span>'); break;
      case 'nano': printH('<span class="t-yellow">nano: command not found (we\'re vim people here)</span>'); break;
      case 'emacs': printH('<span class="t-yellow">This terminal isn\'t big enough for Emacs.</span>'); break;
      case 'exit': case 'quit': case 'logout': printH('<span class="t-yellow">There is no escape. Type \'help\' to embrace it.</span>'); break;
      case 'cd': printH('<span class="t-yellow">There\'s nowhere else to go. You\'re already home.</span>'); break;
      case 'curl': cmdCurl(); break;
      case 'grep': print('grep: try looking with your eyes', 't-gray'); break;
      case 'man': print('No manual entry. We learn by doing here.', 't-gray'); break;
      case 'top': case 'htop': printH('<span class="t-green">PID 1: avrah-studio (running, no issues, vibes nominal)</span>'); break;
      case 'git': cmdGit(args); break;
      case 'npm': case 'yarn': case 'pnpm': printH('<span class="t-yellow">node_modules: the heaviest object in the known universe</span>'); break;
      case 'python': case 'python3': case 'node': print("This isn't that kind of terminal. Try 'snake' for fun.", 't-gray'); break;
      case 'ssh': printH('<span class="t-red">Connection refused. This is a one-way terminal.</span>'); break;
      case 'sl': cmdSl(); break;
      case 'hello': case 'hi': case 'hey': printH('<span class="t-green">Hey! Type \'help\' to see what you can do.</span>'); break;
      case 'coffee': printH('<span class="t-yellow">Brewing... done. Here you go. \u2615</span>'); break;
      case 'please': printH('<span class="t-green">Since you asked nicely... type \'help\' for commands.</span>'); break;
      case 'xkcd': print('There\'s always a relevant xkcd.', 't-gray'); break;
      default:
        printH('<span class="t-red">' + esc(c) + ': command not found. Try \'help\'.</span>');
    }
    print('');
  }

  function cmdHelp() {
    printH('<span class="t-green t-bold">Available commands:</span>');
    print('');
    var cmds = [
      ['ls [-la]','list files'], ['cat <file>','read a file'], ['pwd','working directory'],
      ['whoami','who are you?'], ['echo <text>','echo text'], ['date','current date/time'],
      ['uptime','system uptime'], ['ping <host>','ping a host'], ['make','build a product'],
      ['neofetch','system info'], ['cowsay <msg>','a cow says things'], ['fortune','words of wisdom'],
      ['snake','play snake'], ['matrix','take the red pill'], ['history','command history'],
      ['clear','clear screen']
    ];
    cmds.forEach(function(pair) {
      var pad = pair[0]; while (pad.length < 16) pad += ' ';
      printH('  <span class="t-blue">' + pad + '</span><span class="t-gray">' + pair[1] + '</span>');
    });
    print('');
    printH('<span class="t-gray">Hint: there are hidden commands. Explore.</span>');
  }

  function cmdLs(args) {
    var showA = args.some(function(a) { return a.indexOf('a') !== -1; });
    var showL = args.some(function(a) { return a.indexOf('l') !== -1; });
    var names = Object.keys(fs);
    var vis = showA ? names : names.filter(function(f) { return f[0] !== '.'; });
    if (showL) {
      printH('<span class="t-gray">total ' + vis.length + '</span>');
      vis.forEach(function(f) {
        var sz = ('     ' + fs[f].length).slice(-5);
        printH('<span class="t-gray">-rw-r--r--  1 avrah  staff  ' + sz + '  Jan  1 00:00  </span>' + (f[0]==='.'?'<span class="t-gray">'+f+'</span>':f));
      });
    } else {
      printH(vis.map(function(f) { return f[0]==='.'?'<span class="t-gray">'+f+'</span>':f; }).join('  '));
    }
  }

  function cmdCat(args) {
    if (!args.length) { printH('<span class="t-red">cat: missing file operand</span>'); return; }
    var f = args[0];
    if (fs[f]) { fs[f].split('\n').forEach(function(l) { print(l); }); }
    else {
      printH('<span class="t-red">cat: ' + esc(f) + ': No such file or directory</span>');
      if (f === 'secret' || f === 'secret.txt') printH('<span class="t-gray">Hint: try ls -la</span>');
    }
  }

  function cmdUptime() {
    var days = Math.floor((new Date() - new Date('2024-01-01')) / 86400000);
    print('up ' + days + ' days, shipping products since 2024');
  }

  function cmdPing(args) {
    var host = args[0] || 'avrah.studio';
    var lines = ['PING ' + host + ' (49.89.97.14): 56 data bytes'];
    for (var i = 0; i < 4; i++) {
      lines.push('64 bytes from 49.89.97.14: icmp_seq=' + i + ' ttl=64 time=' + (Math.random()*20+5).toFixed(1) + ' ms');
    }
    lines.push('');
    lines.push('--- ' + host + ' ping statistics ---');
    lines.push('4 packets transmitted, 4 received, 0% packet loss');
    printDelayed(lines, 300);
  }

  function cmdMake(args) {
    if (args.join(' ').toLowerCase() === 'me a sandwich') {
      printH('<span class="t-yellow">What? Make it yourself.</span>'); return;
    }
    var lines = [
      {h:'<span class="t-gray">[  0%] Scanning requirements...</span>'},
      {h:'<span class="t-gray">[ 12%] Compiling firmware...</span>'},
      {h:'<span class="t-gray">[ 25%] Linking bootloader...</span>'},
      {h:'<span class="t-gray">[ 37%] Flashing secure boot keys...</span>'},
      {h:'<span class="t-yellow">[ 50%] Building cloud infrastructure...</span>'},
      {h:'<span class="t-yellow">[ 62%] Deploying MQTT broker...</span>'},
      {h:'<span class="t-yellow">[ 75%] Provisioning fleet...</span>'},
      {h:'<span class="t-blue">[ 87%] Running integration tests...</span>'},
      {h:'<span class="t-blue">[ 94%] Generating manufacturing tooling...</span>'},
      {h:'<span class="t-green t-bold">[100%] \u2713 Product ready for production.</span>'},
      '',
      {h:'<span class="t-green">Build complete. Ship it.</span>'}
    ];
    printDelayed(lines, 350);
  }

  function cmdNeofetch() {
    var art = [
      '       _   _   ______  _   _ ',
      '      / \\ | | / / _  \\| | | |',
      '     / _ \\| |/ / |_| || |_| |',
      '    / ___ |   /|  _  ||  _  |',
      '   /_/   \\_\\_/ |_| |_||_| |_|'
    ];
    var info = [
      '<span class="t-green t-bold">visitor</span><span class="t-gray">@</span><span class="t-green t-bold">avrah</span>',
      '<span class="t-gray">\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500</span>',
      '<span class="t-blue">OS:</span> AvrahOS 1.0 (notebook ed.)',
      '<span class="t-blue">Host:</span> avrah.studio',
      '<span class="t-blue">Kernel:</span> FreeRTOS 10.5.1',
      '<span class="t-blue">Shell:</span> avrah-sh 1.0',
      '<span class="t-blue">CPU:</span> ARM Cortex-M4F @ 168MHz',
      '<span class="t-blue">Memory:</span> 42KB / 256KB',
      '<span class="t-blue">Uptime:</span> shipping since 2024',
      '<span class="t-blue">Location:</span> 49.89\u00b0N 97.14\u00b0W'
    ];
    var maxLines = Math.max(art.length, info.length);
    for (var i = 0; i < maxLines; i++) {
      var left = i < art.length ? '<span class="t-blue t-bold">' + esc(art[i]) + '</span>' : '<span>                               </span>';
      var right = i < info.length ? '   ' + info[i] : '';
      printH('<span style="display:inline-block;min-width:240px">' + left + '</span>' + right);
    }
    printH('<br><span style="display:inline-block;min-width:240px"></span>' +
      '<span style="background:#1c1917;color:#1c1917">\u2588\u2588\u2588</span>' +
      '<span style="background:#c23838;color:#c23838">\u2588\u2588\u2588</span>' +
      '<span style="background:#3fb950;color:#3fb950">\u2588\u2588\u2588</span>' +
      '<span style="background:#d29922;color:#d29922">\u2588\u2588\u2588</span>' +
      '<span style="background:#58a6ff;color:#58a6ff">\u2588\u2588\u2588</span>' +
      '<span style="background:#a371f7;color:#a371f7">\u2588\u2588\u2588</span>' +
      '<span style="background:#39d353;color:#39d353">\u2588\u2588\u2588</span>' +
      '<span style="background:#c9d1d9;color:#c9d1d9">\u2588\u2588\u2588</span>');
  }

  function cmdCowsay(text) {
    var len = Math.min(text.length, 40);
    var wrapped = [];
    for (var i = 0; i < text.length; i += len) wrapped.push(text.substring(i, i + len));
    var border = '+' + Array(len + 3).join('-') + '+';
    print(' ' + border);
    wrapped.forEach(function(line) { var pad = line; while(pad.length<len) pad+=' '; print(' | ' + pad + ' |'); });
    print(' ' + border);
    print('        \\   ^__^');
    print('         \\  (oo)\\_______');
    print('            (__)\\       )\\/\\');
    print('                ||----w |');
    print('                ||     ||');
  }

  function cmdFortune() {
    printH('<span class="t-yellow">' + esc(fortunes[Math.floor(Math.random() * fortunes.length)]) + '</span>');
  }

  function cmdHistory() {
    history.forEach(function(cmd, i) {
      print('  ' + ('    ' + (i+1)).slice(-4) + '  ' + cmd);
    });
  }

  function cmdSandwich() {
    printH('<span class="t-green t-bold">\ud83e\udd6a Okay.</span>');
    print('');
    print('  \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510');
    print('  \u2502 \u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248 \u2502  bread');
    print('  \u2502 \u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593 \u2502  avocado');
    print('  \u2502 \u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2502  turkey');
    print('  \u2502 \u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593\u2593 \u2502  cheese');
    print('  \u2502 \u2234\u2234\u2234\u2234\u2234\u2234\u2234\u2234\u2234\u2234\u2234\u2234\u2234\u2234\u2234 \u2502  lettuce');
    print('  \u2502 \u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248\u2248 \u2502  bread');
    print('  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518');
  }

  function cmdMagic() {
    printDelayed([
      '',
      {h:'<span class="t-yellow t-bold">  \u2728 A V R A   K\' D A V R A \u2728</span>'},
      '',
      {h:'<span class="t-yellow">  "I create as I speak."</span>'},
      '',
      {h:'<span class="t-gray">  The words shimmer...</span>'},
      {h:'<span class="t-gray">  A concept materializes...</span>'},
      {h:'<span class="t-gray">  Firmware compiles itself...</span>'},
      {h:'<span class="t-gray">  Hardware assembles from thin air...</span>'},
      '',
      {h:'<span class="t-green t-bold">  \u2713 Product created. Magic is just engineering</span>'},
      {h:'<span class="t-green t-bold">    that hasn\'t been explained yet.</span>'}
    ], 400);
  }

  function cmdRmRf() {
    inputLine.style.display = 'none';
    var count = 0;
    var glitch = setInterval(function() {
      termBody.style.transform = 'translate(' + (Math.random()*6-3) + 'px,' + (Math.random()*6-3) + 'px)';
      termBody.style.opacity = '' + (Math.random()*0.5+0.5);
      count++;
      if (count > 15) {
        clearInterval(glitch);
        termBody.style.transform = 'none';
        termBody.style.opacity = '1';
        printH('<span class="t-red t-bold">rm: nice try. This is a read-only filesystem.</span>');
        printH('<span class="t-red">Besides, you wouldn\'t delete something this beautiful.</span>');
        print('');
        inputLine.style.display = 'flex';
        input.focus();
      }
    }, 80);
  }

  function cmdCurl() {
    printH('<span class="t-gray">&lt;!DOCTYPE html&gt;</span>');
    printH('<span class="t-gray">&lt;html&gt;&lt;head&gt;&lt;title&gt;Avrah&lt;/title&gt;&lt;/head&gt;</span>');
    printH('<span class="t-gray">&lt;body&gt;</span>');
    printH('<span class="t-green">  We build connected products.</span>');
    printH('<span class="t-green">  You\'re already on the site. Scroll up.</span>');
    printH('<span class="t-gray">&lt;/body&gt;&lt;/html&gt;</span>');
  }

  function cmdGit(args) {
    var sub = (args[0] || '').toLowerCase();
    if (sub === 'status') {
      printH('<span class="t-green">On branch main</span>');
      print('nothing to commit, working tree clean');
      print('(products are shipping, all is well)');
    } else if (sub === 'log') {
      print('commit a1b2c3d (HEAD -> main)');
      print('Author: avrah <build@avrah.studio>');
      print('Date:   Today');
      print('');
      print('    ship: another product into the world');
    } else if (sub === 'blame') {
      printH('<span class="t-yellow">Not us. Definitely not us.</span>');
    } else {
      print("git: this isn't a repo. But we do love version control.");
    }
  }

  function cmdSl() {
    var lines = [
      '      ====        ________',
      '  _D _|  |_______/        \\__I_I_____===__|_',
      '   |(_)---  |   H\\________/ |   |        =|_',
      '   /     |  |   H  |  |     |   |         ||',
      '  |      |  |   H  |__--------------------| |',
      '  | ________|___H__/__|_____/[][]~\\_______|  |',
      '  |/ |   |-----------I_____I [][] []  D   |=|'
    ];
    lines.forEach(function(f) { printH('<span class="t-gray">' + esc(f) + '</span>'); });
    printH('<span class="t-yellow">You meant \'ls\', didn\'t you?</span>');
  }

  // ══ Snake ══
  function cmdSnake() {
    if (gameActive) return;
    gameActive = true;

    var COLS = 28, ROWS = 16, CELL = 16;

    inputLine.style.display = 'none';
    printH('<span class="t-green t-bold">\ud83d\udc0d SNAKE</span>  <span class="t-gray">Arrows/WASD to move. Q or ESC to quit.</span>');

    var canvas = document.createElement('canvas');
    canvas.id = 'snake-canvas';
    canvas.width = COLS * CELL;
    canvas.height = ROWS * CELL;
    canvas.style.width = Math.min(COLS * CELL, termBody.clientWidth - 32) + 'px';
    output.appendChild(canvas);

    var scoreDiv = document.createElement('div');
    scoreDiv.className = 't-green';
    scoreDiv.textContent = 'Score: 0';
    output.appendChild(scoreDiv);
    termBody.scrollTop = termBody.scrollHeight;

    var ctx = canvas.getContext('2d');
    var snake = [{x:5,y:8},{x:4,y:8},{x:3,y:8}];
    var dir = {x:1,y:0}, nextDir = {x:1,y:0};
    var food = spawnFood();
    var score = 0, over = false, speed = 150, lastT = 0, animId = null;

    function spawnFood() {
      var p;
      do { p = {x:Math.floor(Math.random()*COLS),y:Math.floor(Math.random()*ROWS)}; }
      while (snake.some(function(s) { return s.x===p.x && s.y===p.y; }));
      return p;
    }

    function draw() {
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#161b22';
      for (var x = 0; x < COLS; x++)
        for (var y = 0; y < ROWS; y++)
          ctx.fillRect(x*CELL + CELL/2, y*CELL + CELL/2, 1, 1);
      ctx.fillStyle = '#f85149';
      ctx.fillRect(food.x*CELL+2, food.y*CELL+2, CELL-4, CELL-4);
      snake.forEach(function(seg, i) {
        ctx.fillStyle = i===0 ? '#3fb950' : '#238636';
        ctx.fillRect(seg.x*CELL+1, seg.y*CELL+1, CELL-2, CELL-2);
      });
      if (over) {
        ctx.fillStyle = 'rgba(13,17,23,0.75)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#f85149';
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2-10);
        ctx.fillStyle = '#c9d1d9';
        ctx.font = '14px monospace';
        ctx.fillText('Score: '+score+'  |  Q to exit', canvas.width/2, canvas.height/2+15);
      }
    }

    function update(ts) {
      if (!lastT) lastT = ts;
      if (ts - lastT >= speed) {
        lastT = ts;
        if (!over) {
          dir = {x:nextDir.x, y:nextDir.y};
          var head = {x:snake[0].x+dir.x, y:snake[0].y+dir.y};
          if (head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS||snake.some(function(s){return s.x===head.x&&s.y===head.y;})) {
            over = true;
          } else {
            snake.unshift(head);
            if (head.x===food.x && head.y===food.y) {
              score++;
              food = spawnFood();
              speed = Math.max(60, 150 - score * 5);
              scoreDiv.textContent = 'Score: ' + score;
            } else { snake.pop(); }
          }
        }
      }
      draw();
      animId = requestAnimationFrame(update);
    }

    function onKey(e) {
      var k = e.key.toLowerCase();
      if (k === 'q' || k === 'escape') { endGame(); return; }
      if (over) return;
      if ((k==='arrowup'||k==='w') && dir.y!==1) { nextDir={x:0,y:-1}; e.preventDefault(); }
      else if ((k==='arrowdown'||k==='s') && dir.y!==-1) { nextDir={x:0,y:1}; e.preventDefault(); }
      else if ((k==='arrowleft'||k==='a') && dir.x!==1) { nextDir={x:-1,y:0}; e.preventDefault(); }
      else if ((k==='arrowright'||k==='d') && dir.x!==-1) { nextDir={x:1,y:0}; e.preventDefault(); }
    }

    var tx0=0, ty0=0;
    function onTS(e) { tx0=e.touches[0].clientX; ty0=e.touches[0].clientY; }
    function onTE(e) {
      if (over) { endGame(); return; }
      var dx=e.changedTouches[0].clientX-tx0, dy=e.changedTouches[0].clientY-ty0;
      if (Math.abs(dx)>Math.abs(dy)) {
        if (dx>20&&dir.x!==-1) nextDir={x:1,y:0};
        else if (dx<-20&&dir.x!==1) nextDir={x:-1,y:0};
      } else {
        if (dy>20&&dir.y!==-1) nextDir={x:0,y:1};
        else if (dy<-20&&dir.y!==1) nextDir={x:0,y:-1};
      }
    }

    function endGame() {
      cancelAnimationFrame(animId);
      document.removeEventListener('keydown', onKey);
      canvas.removeEventListener('touchstart', onTS);
      canvas.removeEventListener('touchend', onTE);
      canvas.remove();
      scoreDiv.remove();
      printH('<span class="t-green">Final score: ' + score + '</span>');
      print('');
      inputLine.style.display = 'flex';
      input.focus();
      gameActive = false;
    }

    document.addEventListener('keydown', onKey);
    canvas.addEventListener('touchstart', onTS, {passive:true});
    canvas.addEventListener('touchend', onTE, {passive:true});
    animId = requestAnimationFrame(update);
  }

  // ══ Matrix ══
  function cmdMatrix() {
    if (gameActive) return;
    gameActive = true;
    inputLine.style.display = 'none';

    var rect = termBody.getBoundingClientRect();
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:'+rect.top+'px;left:'+rect.left+'px;z-index:1000;pointer-events:none;';
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = rect.width+'px';
    canvas.style.height = rect.height+'px';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var cols = Math.floor(canvas.width / 14);
    var drops = [];
    for (var i = 0; i < cols; i++) drops[i] = 1;
    var chars = '\u30a2\u30a4\u30a6\u30a8\u30aa\u30ab\u30ad\u30af\u30b1\u30b3\u30b5\u30b7\u30b9\u30bb\u30bd\u30bf\u30c1\u30c4\u30c6\u30c80123456789AVRAH';
    var stopped = false;

    var interval = setInterval(function() {
      ctx.fillStyle = 'rgba(13,17,23,0.05)';
      ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#3fb950';
      ctx.font = '14px monospace';
      for (var j = 0; j < drops.length; j++) {
        ctx.fillText(chars[Math.floor(Math.random()*chars.length)], j*14, drops[j]*14);
        if (drops[j]*14 > canvas.height && Math.random() > 0.975) drops[j] = 0;
        drops[j]++;
      }
    }, 45);

    function stop() {
      if (stopped) return;
      stopped = true;
      clearInterval(interval);
      canvas.remove();
      document.removeEventListener('keydown', onKey);
      printH('<span class="t-green">Wake up, Neo...</span>');
      print('');
      inputLine.style.display = 'flex';
      input.focus();
      gameActive = false;
    }

    function onKey(e) { if (e.key) stop(); }
    document.addEventListener('keydown', onKey);
    setTimeout(stop, 5000);
  }

  // Auto-focus when visible
  var sect = document.getElementById('terminal-section');
  if (sect && 'IntersectionObserver' in window) {
    new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting && !gameActive) input.focus();
    }, {threshold:0.5}).observe(sect);
  }
})();

// ══ Carousel ══
(function() {
  'use strict';
  var track = document.querySelector('.carousel-track');
  var prev = document.querySelector('.carousel-prev');
  var next = document.querySelector('.carousel-next');
  if (!track || !prev || !next) return;

  var offset = 0;

  function getVisibleCount() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  function getCardWidth() {
    var card = track.querySelector('.currently-card');
    if (!card) return 0;
    var style = window.getComputedStyle(track);
    var gap = parseInt(style.gap) || 20;
    return card.offsetWidth + gap;
  }

  function totalCards() {
    return track.querySelectorAll('.currently-card').length;
  }

  function maxOffset() {
    return Math.max(0, totalCards() - getVisibleCount());
  }

  function slide() {
    var cardWidth = getCardWidth();
    track.style.transform = 'translateX(-' + (offset * cardWidth) + 'px)';
  }

  prev.addEventListener('click', function() {
    offset = Math.max(0, offset - 1);
    slide();
  });

  next.addEventListener('click', function() {
    offset = Math.min(maxOffset(), offset + 1);
    slide();
  });

  window.addEventListener('resize', function() {
    if (offset > maxOffset()) offset = maxOffset();
    slide();
  });
})();


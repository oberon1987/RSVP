/**
 * Terminal Animation Module
 * Handles boot sequence and typing effects
 */

const Terminal = {
    bootOutput: null,
    bootCursor: null,
    pressKey: null,
    bootScreen: null,
    mainApp: null,

    // Boot sequence commands and messages
    bootSequence: [
        { type: 'system', text: 'BIOS v3.14.159 - GIBSON SYSTEMS INC.', delay: 100 },
        { type: 'system', text: '════════════════════════════════════════════════════════', delay: 50 },
        { type: 'blank', delay: 200 },
        { type: 'command', text: '> Initializing neural interface...', delay: 100 },
        { type: 'success', text: '  [OK] Neural handshake complete', delay: 150 },
        { type: 'blank', delay: 100 },
        { type: 'command', text: '> Establishing encrypted connection...', delay: 100 },
        { type: 'success', text: '  [OK] AES-256 tunnel active', delay: 150 },
        { type: 'success', text: '  [OK] Proxy chain: TOR → I2P → GIBSON', delay: 200 },
        { type: 'blank', delay: 100 },
        { type: 'command', text: '> Bypassing security protocols...', delay: 100 },
        { type: 'warning', text: '  [!] Firewall detected... circumventing', delay: 300 },
        { type: 'success', text: '  [OK] Access granted', delay: 150 },
        { type: 'blank', delay: 100 },
        { type: 'command', text: '> Loading identity matrix...', delay: 100 },
        { type: 'success', text: '  [OK] Handle database synchronized', delay: 150 },
        { type: 'success', text: '  [OK] Avatar renderer initialized', delay: 150 },
        { type: 'success', text: '  [OK] Bio generator calibrated', delay: 150 },
        { type: 'blank', delay: 100 },
        { type: 'command', text: '> Scanning for intrusion detection...', delay: 100 },
        { type: 'success', text: '  [OK] Coast is clear', delay: 200 },
        { type: 'blank', delay: 200 },
        { type: 'command', text: '> Hacking the planet...', delay: 100 },
        { type: 'success', text: '  [OK] Planet successfully hacked', delay: 300 },
        { type: 'blank', delay: 300 },
        { type: 'ascii', text: `
    ╦ ╦╔═╗╔═╗╦╔═  ╔╦╗╦ ╦╔═╗  ╔═╗╦  ╔═╗╔╗╔╔═╗╔╦╗
    ╠═╣╠═╣║  ╠╩╗   ║ ╠═╣║╣   ╠═╝║  ╠═╣║║║║╣  ║
    ╩ ╩╩ ╩╚═╝╩ ╩   ╩ ╩ ╩╚═╝  ╩  ╩═╝╩ ╩╝╚╝╚═╝ ╩
`, delay: 100 },
        { type: 'blank', delay: 300 },
        { type: 'system', text: '════════════════════════════════════════════════════════', delay: 50 },
        { type: 'success', text: '  SYSTEM READY - WELCOME TO THE UNDERGROUND', delay: 200 },
        { type: 'system', text: '════════════════════════════════════════════════════════', delay: 50 },
    ],

    /**
     * Initialize the terminal module
     */
    init() {
        this.bootOutput = document.getElementById('boot-output');
        this.bootCursor = document.getElementById('boot-cursor');
        this.pressKey = document.getElementById('press-key');
        this.bootScreen = document.getElementById('boot-screen');
        this.mainApp = document.getElementById('main-app');
    },

    /**
     * Run the boot sequence animation
     */
    async runBootSequence() {
        for (const item of this.bootSequence) {
            await this.processBootItem(item);
        }

        // Show press key prompt
        this.pressKey.classList.remove('hidden');

        // Add event listener for any key press
        const handleKeyPress = () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('click', handleKeyPress);
            this.transitionToMainApp();
        };

        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('click', handleKeyPress);
    },

    /**
     * Process a single boot sequence item
     */
    async processBootItem(item) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (item.type === 'blank') {
                    this.appendLine('', '');
                } else {
                    this.appendLine(item.text, item.type);
                }
                resolve();
            }, item.delay);
        });
    },

    /**
     * Append a line to the boot output
     */
    appendLine(text, className) {
        const line = document.createElement('div');
        line.className = className;

        if (className === 'ascii') {
            line.classList.add('ascii-art');
            line.style.whiteSpace = 'pre';
        }

        line.textContent = text;
        this.bootOutput.appendChild(line);

        // Auto-scroll to bottom
        this.bootOutput.scrollTop = this.bootOutput.scrollHeight;
    },

    /**
     * Transition from boot screen to main app
     */
    transitionToMainApp() {
        this.bootScreen.style.transition = 'opacity 0.5s ease';
        this.bootScreen.style.opacity = '0';

        setTimeout(() => {
            this.bootScreen.classList.add('hidden');
            this.mainApp.classList.remove('hidden');
            this.mainApp.style.opacity = '0';
            this.mainApp.style.transition = 'opacity 0.5s ease';

            setTimeout(() => {
                this.mainApp.style.opacity = '1';
            }, 50);
        }, 500);
    },

    /**
     * Type text with typewriter effect (for mini terminal)
     */
    async typeText(element, text, speed = 30) {
        return new Promise(resolve => {
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);
        });
    },

    /**
     * Run generation animation in mini terminal
     */
    async runGenerationAnimation(archetype) {
        const miniTerminal = document.getElementById('mini-terminal');
        const miniOutput = document.getElementById('mini-terminal-output');
        const genStatus = document.getElementById('gen-status');

        // Show mini terminal
        miniTerminal.classList.remove('hidden');
        miniOutput.innerHTML = '';
        genStatus.textContent = 'PROCESSING...';

        const commands = [
            { cmd: `./hack_identity --type="${archetype}"`, result: 'Initializing identity matrix...' },
            { cmd: 'decrypt_persona.sh', result: 'Decrypting persona database...' },
            { cmd: 'generate_handle --seed=$RANDOM', result: 'Generating unique handle...' },
            { cmd: 'compile_avatar --render=ascii', result: 'Rendering avatar...' },
            { cmd: 'fetch_achievements --legendary', result: 'Loading achievement history...' },
            { cmd: 'EXPORT identity.dat', result: '[SUCCESS] Identity generated!' },
        ];

        for (const command of commands) {
            const cmdLine = document.createElement('div');
            cmdLine.innerHTML = `<span class="cmd">$ ${command.cmd}</span>`;
            miniOutput.appendChild(cmdLine);

            await this.delay(200);

            const resultLine = document.createElement('div');
            resultLine.innerHTML = `<span class="result">${command.result}</span>`;
            miniOutput.appendChild(resultLine);

            // Auto-scroll
            miniOutput.scrollTop = miniOutput.scrollHeight;

            await this.delay(150);
        }

        genStatus.textContent = 'COMPLETE_';

        await this.delay(300);

        // Hide mini terminal after a moment
        setTimeout(() => {
            miniTerminal.classList.add('hidden');
            genStatus.textContent = 'READY_';
        }, 2000);
    },

    /**
     * Simple delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

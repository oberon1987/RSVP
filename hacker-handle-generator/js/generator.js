/**
 * Hacker Identity Generator Module
 * Generates handles, avatars, and bios based on archetype
 */

const Generator = {
    // Archetype configurations with unique flavors
    archetypes: {
        'white-hat': {
            name: 'WHITE HAT',
            title: 'Ethical Guardian',
            color: '#00ff00',
            prefixes: ['Secure', 'Guardian', 'Shield', 'Sentinel', 'Patch', 'Firewall', 'Cipher', 'Vault', 'Defend', 'Safe'],
            suffixes: ['Knight', 'Warden', 'Protector', 'Keeper', 'Guard', 'Hero', 'Angel', 'Savior', 'Defender', 'Champion'],
            middles: ['Cyber', 'Net', 'Data', 'Code', 'Crypto', 'Sys', 'Sec', 'Auth', 'Zero', 'One'],
            bios: [
                "A legendary ethical hacker who once saved a Fortune 500 company by hacking their own systems with nothing but a smart toaster and determination.",
                "Reformed black hat turned digital crusader. Now dedicates their life to making the internet a safer place, one vulnerability report at a time.",
                "The kind of hacker who breaks into systems just to leave sticky notes about their security flaws. Chaotic good energy at its finest.",
                "Rumored to have prevented three cyber apocalypses before breakfast. Drinks coffee black, like their terminal background."
            ],
            achievements: [
                "Discovered 47 zero-day vulnerabilities before they had their morning coffee",
                "Saved a hospital's entire patient database from ransomware using only vim",
                "Bug bounty earnings exceed GDP of small island nations",
                "Once patched a critical vulnerability while skydiving",
                "Has a reserved parking spot at every major tech company's security office"
            ],
            avatar: `
   ╔══════╗
   ║ ◯  ◯ ║
   ║  ██  ║
   ║ ╰──╯ ║
   ╚══════╝
   ┃ GOOD ┃
   ╔══════╗
   ║ ░░░░ ║
   ╚══════╝`
        },
        'black-hat': {
            name: 'BLACK HAT',
            title: 'Shadow Operator',
            color: '#ff0040',
            prefixes: ['Dark', 'Shadow', 'Phantom', 'Ghost', 'Void', 'Null', 'Chaos', 'Doom', 'Viper', 'Raven'],
            suffixes: ['Storm', 'Reaper', 'Wraith', 'Specter', 'Shade', 'Serpent', 'Demon', 'Lord', 'Master', 'King'],
            middles: ['Byte', 'Bit', 'Hex', 'Root', 'Admin', 'Sudo', 'Shell', 'Exec', 'Mal', 'Crypt'],
            bios: [
                "They don't hack for money. They hack because somewhere, somehow, a corporation is having a good day and that's simply unacceptable.",
                "Legend says they once crashed the entire internet just to win an argument about tabs vs spaces. They were right. It was tabs.",
                "Operating from an undisclosed location that definitely isn't their mom's basement (it's their dad's basement, actually).",
                "Has more aliases than a spy novel protagonist. Even their cat doesn't know their real name."
            ],
            achievements: [
                "Made the FBI's most wanted list for hacking their most wanted list",
                "Successfully rickrolled the entire Pentagon",
                "Cryptocurrency portfolio exists only in the blockchain's nightmares",
                "Once held a tech giant's code hostage for better pizza toppings in the cafeteria",
                "Has crashed more systems than Windows ME"
            ],
            avatar: `
   ╔══════╗
   ║ ▓  ▓ ║
   ║  ▀▀  ║
   ║ ╭──╮ ║
   ╚══════╝
   ┃ EVIL ┃
   ╔══════╗
   ║ ████ ║
   ╚══════╝`
        },
        'grey-hat': {
            name: 'GREY HAT',
            title: 'Moral Renegade',
            color: '#888888',
            prefixes: ['Twilight', 'Dusk', 'Fog', 'Mist', 'Haze', 'Smoke', 'Blur', 'Fade', 'Gray', 'Ash'],
            suffixes: ['Walker', 'Drifter', 'Wanderer', 'Ranger', 'Rogue', 'Nomad', 'Maverick', 'Rebel', 'Outlaw', 'Lone'],
            middles: ['Wire', 'Link', 'Node', 'Port', 'Gate', 'Path', 'Zone', 'Edge', 'Line', 'Wave'],
            bios: [
                "Lives in the ethical grey area like it's a rent-controlled apartment. Will hack you, then send you a detailed report on how to fix it.",
                "Chaotic neutral hacker who flips a coin before deciding whether to report a vulnerability or... not.",
                "Believes in hacking first, asking questions later, and then maybe patching it if they feel like it.",
                "The digital equivalent of a vigilante who jaywalks to fight crime."
            ],
            achievements: [
                "Hacked a company, reported the bug, then hacked them again to make sure they fixed it",
                "Operates on a strict 'break it then fix it' methodology",
                "Has been both thanked and sued by the same company",
                "Moral compass spins like a loading cursor",
                "Once turned down a bug bounty to prove a point nobody understood"
            ],
            avatar: `
   ╔══════╗
   ║ ●  ○ ║
   ║  ░▓  ║
   ║ ╭╌╌╮ ║
   ╚══════╝
   ┃ ????  ┃
   ╔══════╗
   ║ ░▓░▓ ║
   ╚══════╝`
        },
        'neuromancer': {
            name: 'NEUROMANCER',
            title: 'Neural Jacker',
            color: '#ff00ff',
            prefixes: ['Neural', 'Synth', 'Cyber', 'Chrome', 'Neon', 'Pulse', 'Matrix', 'Grid', 'Flux', 'Quantum'],
            suffixes: ['Jack', 'Runner', 'Rider', 'Diver', 'Surfer', 'Cowboy', 'Samurai', 'Ninja', 'Punk', 'Wave'],
            middles: ['Ice', 'Black', 'Ghost', 'Dream', 'Mind', 'Soul', 'Spirit', 'Brain', 'Nerve', 'Syn'],
            bios: [
                "Jacks directly into the net using a custom neural interface they built from old Nokia parts and sheer willpower.",
                "Claims to have transcended physical form and now exists as pure data. Still needs coffee though.",
                "Their consciousness has been uploaded, downloaded, and sideloaded so many times they've lost track of the original.",
                "Dreams in code. Literally. Their REM sleep outputs valid Python."
            ],
            achievements: [
                "Successfully merged consciousness with an AI (it was a weird Tuesday)",
                "Built a neural interface from a Game Boy and dental floss",
                "Has visited digital realms that don't technically exist",
                "Once debugged the Matrix (found three typos)",
                "Their brain is technically a registered server in Finland"
            ],
            avatar: `
   ╔══════╗
   ║ ⚡ ⚡ ║
   ║  ▓▓  ║
   ║ ┌──┐ ║
   ╚══════╝
   ┃NEURAL┃
   ╔══════╗
   ║⌇⌇⌇⌇⌇⌇║
   ╚══════╝`
        },
        'script-kiddie': {
            name: 'SCRIPT KIDDIE',
            title: 'Chaos Agent',
            color: '#ffb000',
            prefixes: ['Leet', 'Noob', 'Epic', 'Mega', 'Ultra', 'Super', 'Hyper', 'Turbo', 'Xtreme', 'Pro'],
            suffixes: ['Hax0r', 'Pwner', 'Master', 'Boss', 'King', 'God', 'Lord', 'Destroyer', 'Slayer', 'Legend'],
            middles: ['420', '69', '1337', '360', 'XXX', '2000', '9000', 'Max', 'Gamer', 'Dank'],
            bios: [
                "Downloaded Kali Linux once and now considers themselves a professional penetration tester. Uses LOIC like it's 2010.",
                "Has watched every hacking tutorial on YouTube. Twice. Still can't exit vim.",
                "Accidentally DDoS'd their own computer trying to hack their neighbor's WiFi. Twice.",
                "Their greatest hack was guessing their crush's Facebook password: 'password123'."
            ],
            achievements: [
                "Successfully ran their first SQL injection (it was on their own test database)",
                "Owns every hacking tool from GitHub, understands approximately 3% of them",
                "Once crashed a website (it was their own WordPress blog)",
                "Has 47 VPNs running simultaneously for 'maximum anonymity'",
                "Learned to code from copy-pasting Stack Overflow answers"
            ],
            avatar: `
   ╔══════╗
   ║ ^  ^ ║
   ║  ◡◡  ║
   ║ ╰▽╯  ║
   ╚══════╝
   ┃ n00b ┃
   ╔══════╗
   ║ 1337 ║
   ╚══════╝`
        },
        'hacktivist': {
            name: 'HACKTIVIST',
            title: 'Digital Activist',
            color: '#00ffff',
            prefixes: ['Freedom', 'Truth', 'Justice', 'Liberty', 'Unity', 'Voice', 'Rise', 'Change', 'Hope', 'Light'],
            suffixes: ['Fighter', 'Warrior', 'Seeker', 'Bringer', 'Speaker', 'Maker', 'Force', 'Spirit', 'Soul', 'Heart'],
            middles: ['Anon', 'Libre', 'Open', 'Free', 'Pure', 'True', 'Real', 'Clear', 'Fair', 'Just'],
            bios: [
                "Hacks the system to fight the system. Has brought down more corrupt organizations than a very motivated auditor.",
                "Believes information wants to be free, especially the kind corporations don't want you to see.",
                "Their manifesto has been translated into 47 languages. They've memorized it in all of them.",
                "Fighting for digital rights one leaked document at a time. The pen is mighty, but the keyboard is mightier."
            ],
            achievements: [
                "Leaked documents that started three revolutions and one very awkward company meeting",
                "DDoS'd a dictatorship's entire internet infrastructure during a protest",
                "Has a Guy Fawkes mask for every occasion",
                "Once hacked a news network to broadcast the truth (it was about pizza toppings)",
                "Their Twitter got banned for being too revolutionary"
            ],
            avatar: `
   ╔══════╗
   ║ ◉  ◉ ║
   ║  ▼▼  ║
   ║ ╰──╯ ║
   ╚══════╝
   ┃ ANON ┃
   ╔══════╗
   ║ FREE ║
   ╚══════╝`
        },
        'phreaker': {
            name: 'PHREAKER',
            title: 'Telecom Phantom',
            color: '#0080ff',
            prefixes: ['Blue', 'Red', 'Tone', 'Dial', 'Ring', 'Bell', 'Line', 'Call', 'Signal', 'Freq'],
            suffixes: ['Box', 'Tone', 'Dial', 'Bell', 'Whistle', 'Beep', 'Buzz', 'Ring', 'Ping', 'Wave'],
            middles: ['2600', 'PBX', 'DTMF', 'Trunk', 'Switch', 'Route', 'Pulse', 'Carrier', 'Modem', 'Fax'],
            bios: [
                "Started hacking when phones still had cords. Can whistle at 2600 Hz on command. Impresses absolutely no one at parties.",
                "Old school telecom wizard who remembers when 'the cloud' meant the phone company's mainframe.",
                "Built their first blue box from a Captain Crunch whistle. Still has it. It's framed.",
                "Has more knowledge about legacy phone systems than the phone companies themselves."
            ],
            achievements: [
                "Made free long-distance calls before it was obsolete",
                "Can identify a phone system by its dial tone alone",
                "Once hacked a payphone to dispense quarters (for research purposes)",
                "Has a collection of rare dial tones like others collect stamps",
                "Built a working blue box that's now in a museum"
            ],
            avatar: `
   ╔══════╗
   ║ ☎  ☏ ║
   ║  ◈◈  ║
   ║ ╰──╯ ║
   ╚══════╝
   ┃ 2600 ┃
   ╔══════╗
   ║⌁⌁⌁⌁⌁⌁║
   ╚══════╝`
        },
        'zero-cool': {
            name: 'ZERO COOL',
            title: 'Legendary Elite',
            color: '#ffff00',
            prefixes: ['Zero', 'Crash', 'Burn', 'Acid', 'Razor', 'Blade', 'Phantom', 'Cereal', 'Lord', 'The'],
            suffixes: ['Cool', 'Override', 'Burn', 'Plague', 'Phreak', 'Edge', 'Girl', 'Master', 'Prime', 'One'],
            middles: ['X', 'Gibson', 'Crash', 'Hack', 'Jack', 'Cyber', 'Net', 'Sys', 'Core', 'Elite'],
            bios: [
                "Crashed 1,507 systems in one day at age 11. The legend never dies, it just gets a faster modem.",
                "Pool on the roof. Hack the planet. This is their mantra, their lifestyle, their entire personality.",
                "The kind of hacker that makes other hackers nervous. Even their screensaver is intimidating.",
                "When they type, keyboards weep with joy. When they hack, servers surrender voluntarily."
            ],
            achievements: [
                "Crashed 1,507 computers in a single day (it was a Tuesday)",
                "Pool on the roof. HACK THE PLANET.",
                "Made the Gibson their personal playground",
                "Has rollerbladed through more server rooms than most admins have visited",
                "Their keyboard shortcuts have keyboard shortcuts"
            ],
            avatar: `
   ╔══════╗
   ║ ★  ★ ║
   ║  ▀▀  ║
   ║ ╰◊╯ ║
   ╚══════╝
   ┃ ELITE┃
   ╔══════╗
   ║ ◆◇◆◇ ║
   ╚══════╝`
        }
    },

    // Number suffixes for handles
    numberSuffixes: ['_X', '_0', '_1', '404', '666', '777', '101', '2600', '1337', '911', '007', '42', '_v2', '_3.0', '9000'],

    // Special characters for handles
    specialChars: ['_', '-', '.', 'x', 'X', '0', '_x_'],

    /**
     * Generate a complete hacker identity
     */
    generateIdentity(archetypeKey) {
        const archetype = this.archetypes[archetypeKey];
        if (!archetype) return null;

        return {
            handle: this.generateHandle(archetype),
            bio: this.generateBio(archetype),
            achievements: this.generateAchievements(archetype),
            avatar: archetype.avatar,
            archetypeName: archetype.name,
            archetypeTitle: archetype.title,
            archetypeColor: archetype.color
        };
    },

    /**
     * Generate a hacker handle
     */
    generateHandle(archetype) {
        const patterns = [
            () => `${this.random(archetype.prefixes)}${this.random(archetype.middles)}${this.random(this.numberSuffixes)}`,
            () => `${this.random(archetype.prefixes)}_${this.random(archetype.suffixes)}`,
            () => `${this.random(archetype.middles)}${this.random(archetype.suffixes)}${this.random(['_X', '404', ''])}`,
            () => `${this.random(archetype.prefixes)}${this.random(this.specialChars)}${this.random(archetype.suffixes)}`,
            () => `x${this.random(archetype.prefixes)}${this.random(archetype.middles)}x`,
            () => `${this.random(archetype.prefixes)}${this.random(archetype.suffixes)}_${Math.floor(Math.random() * 999)}`,
        ];

        let handle = this.random(patterns)();

        // Randomly leetify some characters
        if (Math.random() > 0.5) {
            handle = this.leetify(handle);
        }

        return handle;
    },

    /**
     * Convert some characters to leet speak
     */
    leetify(text) {
        const leetMap = {
            'a': '4', 'A': '4',
            'e': '3', 'E': '3',
            'i': '1', 'I': '1',
            'o': '0', 'O': '0',
            's': '5', 'S': '5',
            't': '7', 'T': '7'
        };

        return text.split('').map(char => {
            if (leetMap[char] && Math.random() > 0.6) {
                return leetMap[char];
            }
            return char;
        }).join('');
    },

    /**
     * Generate a bio for the hacker
     */
    generateBio(archetype) {
        return this.random(archetype.bios);
    },

    /**
     * Generate achievements list
     */
    generateAchievements(archetype) {
        const shuffled = [...archetype.achievements].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    },

    /**
     * Get a random element from an array
     */
    random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
};

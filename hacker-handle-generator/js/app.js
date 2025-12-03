/**
 * Main Application Module
 * Initializes and coordinates all components
 */

const App = {
    // DOM Elements
    elements: {
        // Generator elements
        archetypeSelect: null,
        generateBtn: null,
        emptyState: null,
        resultContainer: null,
        avatarDisplay: null,
        archetypeBadge: null,
        hackerHandle: null,
        hackerBio: null,
        achievementsList: null,
        copyBtn: null,
        rsvpBtn: null,

        // Navigation
        navGenerator: null,
        navRsvpList: null,
        generatorView: null,
        rsvpView: null,

        // Modal elements
        rsvpModal: null,
        modalClose: null,
        modalOverlay: null,
        rsvpName: null,
        btnAttending: null,
        btnNotAttending: null,
        rsvpSubmit: null,
        modalPreviewHandle: null,
        modalPreviewArchetype: null,

        // RSVP List elements
        rsvpList: null,
        rsvpEmpty: null,
        rsvpCount: null,
        rsvpDetailsEmpty: null,
        rsvpDetailsContent: null,
        rsvpAvatarDisplay: null,
        rsvpArchetypeBadge: null,
        rsvpRealName: null,
        rsvpHackerHandle: null,
        rsvpStatusDisplay: null,
        rsvpHackerBio: null,
        rsvpAchievementsList: null
    },

    // Current generated identity
    currentIdentity: null,

    // Is currently generating
    isGenerating: false,

    // RSVP data storage (in memory - would be backend in production)
    rsvpData: [],

    // Currently selected RSVP attendance option
    selectedAttendance: null,

    // Currently selected RSVP item in list
    selectedRsvpItem: null,

    /**
     * Initialize the application
     */
    init() {
        // Initialize terminal module
        Terminal.init();

        // Cache DOM elements
        this.cacheElements();

        // Bind events
        this.bindEvents();

        // Load any saved RSVP data from localStorage
        this.loadRsvpData();

        // Start boot sequence
        Terminal.runBootSequence();
    },

    /**
     * Cache DOM elements for performance
     */
    cacheElements() {
        // Generator elements
        this.elements.archetypeSelect = document.getElementById('archetype-select');
        this.elements.generateBtn = document.getElementById('generate-btn');
        this.elements.emptyState = document.getElementById('empty-state');
        this.elements.resultContainer = document.getElementById('result-container');
        this.elements.avatarDisplay = document.getElementById('avatar-display');
        this.elements.archetypeBadge = document.getElementById('archetype-badge');
        this.elements.hackerHandle = document.getElementById('hacker-handle');
        this.elements.hackerBio = document.getElementById('hacker-bio');
        this.elements.achievementsList = document.getElementById('achievements-list');
        this.elements.copyBtn = document.getElementById('copy-btn');
        this.elements.rsvpBtn = document.getElementById('rsvp-btn');

        // Navigation
        this.elements.navGenerator = document.getElementById('nav-generator');
        this.elements.navRsvpList = document.getElementById('nav-rsvp-list');
        this.elements.generatorView = document.querySelector('.main-content:not(.rsvp-view)');
        this.elements.rsvpView = document.getElementById('rsvp-view');

        // Modal elements
        this.elements.rsvpModal = document.getElementById('rsvp-modal');
        this.elements.modalClose = document.getElementById('modal-close');
        this.elements.modalOverlay = this.elements.rsvpModal?.querySelector('.modal-overlay');
        this.elements.rsvpName = document.getElementById('rsvp-name');
        this.elements.btnAttending = document.getElementById('btn-attending');
        this.elements.btnNotAttending = document.getElementById('btn-not-attending');
        this.elements.rsvpSubmit = document.getElementById('rsvp-submit');
        this.elements.modalPreviewHandle = document.getElementById('modal-preview-handle');
        this.elements.modalPreviewArchetype = document.getElementById('modal-preview-archetype');

        // RSVP List elements
        this.elements.rsvpList = document.getElementById('rsvp-list');
        this.elements.rsvpEmpty = document.getElementById('rsvp-empty');
        this.elements.rsvpCount = document.getElementById('rsvp-count');
        this.elements.rsvpDetailsEmpty = document.getElementById('rsvp-details-empty');
        this.elements.rsvpDetailsContent = document.getElementById('rsvp-details-content');
        this.elements.rsvpAvatarDisplay = document.getElementById('rsvp-avatar-display');
        this.elements.rsvpArchetypeBadge = document.getElementById('rsvp-archetype-badge');
        this.elements.rsvpRealName = document.getElementById('rsvp-real-name');
        this.elements.rsvpHackerHandle = document.getElementById('rsvp-hacker-handle');
        this.elements.rsvpStatusDisplay = document.getElementById('rsvp-status-display');
        this.elements.rsvpHackerBio = document.getElementById('rsvp-hacker-bio');
        this.elements.rsvpAchievementsList = document.getElementById('rsvp-achievements-list');
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Archetype selection change
        this.elements.archetypeSelect.addEventListener('change', () => {
            this.onArchetypeChange();
        });

        // Generate button click
        this.elements.generateBtn.addEventListener('click', () => {
            this.onGenerateClick();
        });

        // Copy button click
        this.elements.copyBtn.addEventListener('click', () => {
            this.onCopyClick();
        });

        // RSVP button click
        this.elements.rsvpBtn.addEventListener('click', () => {
            this.openRsvpModal();
        });

        // Navigation tabs
        this.elements.navGenerator.addEventListener('click', () => {
            this.switchView('generator');
        });

        this.elements.navRsvpList.addEventListener('click', () => {
            this.switchView('rsvp-list');
        });

        // Modal events
        this.elements.modalClose.addEventListener('click', () => {
            this.closeRsvpModal();
        });

        this.elements.modalOverlay.addEventListener('click', () => {
            this.closeRsvpModal();
        });

        // Attendance buttons
        this.elements.btnAttending.addEventListener('click', () => {
            this.selectAttendance(true);
        });

        this.elements.btnNotAttending.addEventListener('click', () => {
            this.selectAttendance(false);
        });

        // Name input change
        this.elements.rsvpName.addEventListener('input', () => {
            this.validateRsvpForm();
        });

        // Submit RSVP
        this.elements.rsvpSubmit.addEventListener('click', () => {
            this.submitRsvp();
        });

        // Keyboard shortcut for generating (Enter key when archetype selected)
        document.addEventListener('keydown', (e) => {
            // Close modal on Escape
            if (e.key === 'Escape' && !this.elements.rsvpModal.classList.contains('hidden')) {
                this.closeRsvpModal();
                return;
            }

            // Generate on Enter (only in generator view)
            if (e.key === 'Enter' && !this.elements.generateBtn.disabled && !this.isGenerating) {
                if (this.elements.rsvpModal.classList.contains('hidden')) {
                    this.onGenerateClick();
                }
            }
        });
    },

    /**
     * Handle archetype selection change
     */
    onArchetypeChange() {
        const selectedValue = this.elements.archetypeSelect.value;

        if (selectedValue) {
            this.elements.generateBtn.disabled = false;
        } else {
            this.elements.generateBtn.disabled = true;
        }
    },

    /**
     * Handle generate button click
     */
    async onGenerateClick() {
        if (this.isGenerating) return;

        const archetype = this.elements.archetypeSelect.value;
        if (!archetype) return;

        this.isGenerating = true;
        this.elements.generateBtn.disabled = true;

        // Run terminal animation
        await Terminal.runGenerationAnimation(archetype);

        // Generate identity
        this.currentIdentity = Generator.generateIdentity(archetype);

        // Display results
        this.displayIdentity(this.currentIdentity);

        this.isGenerating = false;
        this.elements.generateBtn.disabled = false;
    },

    /**
     * Display the generated identity
     */
    displayIdentity(identity) {
        // Hide empty state, show results
        this.elements.emptyState.classList.add('hidden');
        this.elements.resultContainer.classList.remove('hidden');

        // Set avatar with archetype-specific color
        this.elements.avatarDisplay.textContent = identity.avatar;
        this.elements.avatarDisplay.style.color = identity.archetypeColor;
        this.elements.avatarDisplay.style.borderColor = identity.archetypeColor;
        this.elements.avatarDisplay.style.boxShadow = `0 0 30px ${identity.archetypeColor}44`;

        // Set archetype badge
        this.elements.archetypeBadge.textContent = `${identity.archetypeName} // ${identity.archetypeTitle}`;
        this.elements.archetypeBadge.style.borderColor = identity.archetypeColor;
        this.elements.archetypeBadge.style.color = identity.archetypeColor;

        // Set handle with glitch effect
        this.elements.hackerHandle.textContent = identity.handle;
        this.elements.hackerHandle.style.color = identity.archetypeColor;
        this.elements.hackerHandle.style.textShadow = `0 0 20px ${identity.archetypeColor}`;

        // Set bio
        this.elements.hackerBio.textContent = identity.bio;
        this.elements.hackerBio.style.borderLeftColor = identity.archetypeColor;

        // Set achievements
        this.elements.achievementsList.innerHTML = '';
        identity.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            this.elements.achievementsList.appendChild(li);
        });

        // Reset copy button
        this.elements.copyBtn.classList.remove('copied');
        this.elements.copyBtn.querySelector('span').textContent = '[COPY TO CLIPBOARD]';

        // Trigger animation by removing and re-adding class
        this.elements.resultContainer.style.animation = 'none';
        this.elements.resultContainer.offsetHeight; // Trigger reflow
        this.elements.resultContainer.style.animation = null;
    },

    /**
     * Handle copy button click
     */
    async onCopyClick() {
        if (!this.currentIdentity) return;

        const textToCopy = this.formatIdentityForCopy(this.currentIdentity);

        try {
            await navigator.clipboard.writeText(textToCopy);

            // Visual feedback
            this.elements.copyBtn.classList.add('copied');
            this.elements.copyBtn.querySelector('span').textContent = '[COPIED!]';

            // Reset after 2 seconds
            setTimeout(() => {
                this.elements.copyBtn.classList.remove('copied');
                this.elements.copyBtn.querySelector('span').textContent = '[COPY TO CLIPBOARD]';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    },

    /**
     * Format identity for clipboard
     */
    formatIdentityForCopy(identity) {
        return `
═══════════════════════════════════════
🖥️ HACKER IDENTITY GENERATED
═══════════════════════════════════════

ARCHETYPE: ${identity.archetypeName} // ${identity.archetypeTitle}

HANDLE: ${identity.handle}

DOSSIER:
${identity.bio}

NOTABLE ACHIEVEMENTS:
${identity.achievements.map(a => `• ${a}`).join('\n')}

═══════════════════════════════════════
Generated by HACKER HANDLE GENERATOR v1.0
Instagram User Empowerment Holiday Party
"HACK THE PLANET!"
═══════════════════════════════════════
        `.trim();
    },

    /**
     * Switch between views (generator / rsvp-list)
     */
    switchView(view) {
        if (view === 'generator') {
            this.elements.navGenerator.classList.add('active');
            this.elements.navRsvpList.classList.remove('active');
            this.elements.generatorView.classList.remove('hidden');
            this.elements.rsvpView.classList.add('hidden');
        } else if (view === 'rsvp-list') {
            this.elements.navGenerator.classList.remove('active');
            this.elements.navRsvpList.classList.add('active');
            this.elements.generatorView.classList.add('hidden');
            this.elements.rsvpView.classList.remove('hidden');
            this.renderRsvpList();
        }
    },

    /**
     * Open RSVP modal
     */
    openRsvpModal() {
        if (!this.currentIdentity) return;

        // Reset form
        this.elements.rsvpName.value = '';
        this.selectedAttendance = null;
        this.elements.btnAttending.classList.remove('selected');
        this.elements.btnNotAttending.classList.remove('selected');
        this.elements.rsvpSubmit.disabled = true;

        // Set preview
        this.elements.modalPreviewHandle.textContent = this.currentIdentity.handle;
        this.elements.modalPreviewArchetype.textContent = `${this.currentIdentity.archetypeName} // ${this.currentIdentity.archetypeTitle}`;

        // Show modal
        this.elements.rsvpModal.classList.remove('hidden');

        // Focus name input
        setTimeout(() => {
            this.elements.rsvpName.focus();
        }, 100);
    },

    /**
     * Close RSVP modal
     */
    closeRsvpModal() {
        this.elements.rsvpModal.classList.add('hidden');
    },

    /**
     * Select attendance option
     */
    selectAttendance(isAttending) {
        this.selectedAttendance = isAttending;

        if (isAttending) {
            this.elements.btnAttending.classList.add('selected');
            this.elements.btnNotAttending.classList.remove('selected');
        } else {
            this.elements.btnAttending.classList.remove('selected');
            this.elements.btnNotAttending.classList.add('selected');
        }

        this.validateRsvpForm();
    },

    /**
     * Validate RSVP form
     */
    validateRsvpForm() {
        const nameValid = this.elements.rsvpName.value.trim().length > 0;
        const attendanceSelected = this.selectedAttendance !== null;

        this.elements.rsvpSubmit.disabled = !(nameValid && attendanceSelected);
    },

    /**
     * Submit RSVP
     */
    submitRsvp() {
        const name = this.elements.rsvpName.value.trim();
        if (!name || this.selectedAttendance === null || !this.currentIdentity) return;

        // Create RSVP entry
        const rsvpEntry = {
            id: Date.now(),
            name: name,
            attending: this.selectedAttendance,
            identity: { ...this.currentIdentity },
            timestamp: new Date().toISOString()
        };

        // Add to data
        this.rsvpData.push(rsvpEntry);

        // Save to localStorage
        this.saveRsvpData();

        // Close modal
        this.closeRsvpModal();

        // Switch to RSVP list view
        this.switchView('rsvp-list');

        // Select the newly added entry
        this.selectRsvpItem(rsvpEntry.id);
    },

    /**
     * Save RSVP data to localStorage
     */
    saveRsvpData() {
        try {
            localStorage.setItem('hackerHandleRsvpData', JSON.stringify(this.rsvpData));
        } catch (err) {
            console.error('Failed to save RSVP data:', err);
        }
    },

    /**
     * Load RSVP data from localStorage
     */
    loadRsvpData() {
        try {
            const saved = localStorage.getItem('hackerHandleRsvpData');
            if (saved) {
                this.rsvpData = JSON.parse(saved);
            }
        } catch (err) {
            console.error('Failed to load RSVP data:', err);
            this.rsvpData = [];
        }
    },

    /**
     * Render RSVP list
     */
    renderRsvpList() {
        // Update count
        this.elements.rsvpCount.textContent = `[${this.rsvpData.length}]`;

        // Clear list (except empty state)
        const items = this.elements.rsvpList.querySelectorAll('.rsvp-item');
        items.forEach(item => item.remove());

        if (this.rsvpData.length === 0) {
            this.elements.rsvpEmpty.classList.remove('hidden');
            this.elements.rsvpDetailsEmpty.classList.remove('hidden');
            this.elements.rsvpDetailsContent.classList.add('hidden');
            return;
        }

        this.elements.rsvpEmpty.classList.add('hidden');

        // Render each RSVP entry
        this.rsvpData.forEach(entry => {
            const item = document.createElement('div');
            item.className = 'rsvp-item';
            item.dataset.id = entry.id;

            if (this.selectedRsvpItem === entry.id) {
                item.classList.add('selected');
            }

            item.innerHTML = `
                <div class="rsvp-item-header">
                    <span class="rsvp-item-name">${this.escapeHtml(entry.name)}</span>
                    <span class="rsvp-item-status ${entry.attending ? 'attending' : 'not-attending'}">
                        ${entry.attending ? 'YES' : 'NO'}
                    </span>
                </div>
                <div class="rsvp-item-handle">${this.escapeHtml(entry.identity.handle)}</div>
            `;

            item.addEventListener('click', () => {
                this.selectRsvpItem(entry.id);
            });

            this.elements.rsvpList.appendChild(item);
        });
    },

    /**
     * Select an RSVP item and display details
     */
    selectRsvpItem(id) {
        this.selectedRsvpItem = id;

        // Update selection in list
        const items = this.elements.rsvpList.querySelectorAll('.rsvp-item');
        items.forEach(item => {
            if (parseInt(item.dataset.id) === id) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });

        // Find entry
        const entry = this.rsvpData.find(e => e.id === id);
        if (!entry) return;

        // Show details
        this.elements.rsvpDetailsEmpty.classList.add('hidden');
        this.elements.rsvpDetailsContent.classList.remove('hidden');

        // Populate details
        const identity = entry.identity;

        // Avatar
        this.elements.rsvpAvatarDisplay.textContent = identity.avatar;
        this.elements.rsvpAvatarDisplay.style.color = identity.archetypeColor;
        this.elements.rsvpAvatarDisplay.style.borderColor = identity.archetypeColor;
        this.elements.rsvpAvatarDisplay.style.boxShadow = `0 0 30px ${identity.archetypeColor}44`;

        // Archetype badge
        this.elements.rsvpArchetypeBadge.textContent = `${identity.archetypeName} // ${identity.archetypeTitle}`;
        this.elements.rsvpArchetypeBadge.style.borderColor = identity.archetypeColor;
        this.elements.rsvpArchetypeBadge.style.color = identity.archetypeColor;

        // Real name
        this.elements.rsvpRealName.textContent = entry.name;

        // Handle
        this.elements.rsvpHackerHandle.textContent = identity.handle;
        this.elements.rsvpHackerHandle.style.color = identity.archetypeColor;
        this.elements.rsvpHackerHandle.style.textShadow = `0 0 20px ${identity.archetypeColor}`;

        // Status
        this.elements.rsvpStatusDisplay.textContent = entry.attending ? '✓ ATTENDING' : '✗ NOT ATTENDING';
        this.elements.rsvpStatusDisplay.className = `rsvp-status-display ${entry.attending ? 'attending' : 'not-attending'}`;

        // Bio
        this.elements.rsvpHackerBio.textContent = identity.bio;
        this.elements.rsvpHackerBio.style.borderLeftColor = identity.archetypeColor;

        // Achievements
        this.elements.rsvpAchievementsList.innerHTML = '';
        identity.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            this.elements.rsvpAchievementsList.appendChild(li);
        });
    },

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

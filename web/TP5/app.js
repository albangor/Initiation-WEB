function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function todoApp() {
    return {
        darkMode: false,
        dyslexie: false,
        nouvelleTache: '',
        taches: [],

        init() {
            const themeSauvegarde = localStorage.getItem('theme');
            this.darkMode = themeSauvegarde === 'dark';

            const dyslexieSauvegardee = localStorage.getItem('dyslexie');
            this.dyslexie = dyslexieSauvegardee === 'true';

            const tachesSauvegardees = localStorage.getItem('taches');
            this.taches = tachesSauvegardees ? JSON.parse(tachesSauvegardees) : [];
        },

        basculerTheme() {
            this.darkMode = !this.darkMode;
            localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
            setCookie('theme', this.darkMode ? 'dark' : 'light', 30);
        },

        basculerDyslexie() {
            this.dyslexie = !this.dyslexie;
            localStorage.setItem('dyslexie', this.dyslexie ? 'true' : 'false');
            setCookie('dyslexie', this.dyslexie ? 'true' : 'false', 30);
        },

        ajouterTache() {
            if (this.nouvelleTache.trim() === '') return;
            
            this.taches.push({
                id: Date.now(),
                texte: this.nouvelleTache.trim(),
                terminee: false
            });

            this.nouvelleTache = '';
            this.sauvegarderTaches();
        },

        supprimerTache(id) {
            this.taches = this.taches.filter(tache => tache.id !== id);
            this.sauvegarderTaches();
        },

        sauvegarderTaches() {
            localStorage.setItem('taches', JSON.stringify(this.taches));
        },

        totalTaches() {
            return this.taches.length;
        },

        tachesTerminees() {
            return this.taches.filter(tache => tache.terminee).length;
        },

        tachesRestantes() {
            return this.taches.filter(tache => !tache.terminee).length;
        }
    };
}
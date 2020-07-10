const dbPromised = idb.open("england-soccer", 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("teams")) {
        upgradeDb.createObjectStore("teams", {keyPath: "id"})
    }
})

function saveForLater(team) {
    dbPromised
    .then(function(db) {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        console.log(team);
        store.put(team);
        return tx.complete;
    })
    .then(function(db) {
        M.toast({html: 'Team saved!'});
    })
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            const tx = db.transaction("teams", "readonly");
            const store = tx.objectStore("teams");
            return store.getAll();
        })
        .then(function(teams) {
            if (teams.length!==0) {
                resolve(teams);
            } else {
                reject(alert("There are no saved team yet"));
            }
        });
    });
}

function deleteTeam(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            const tx = db.transaction("teams", "readwrite");
            tx.objectStore("teams").delete(parseInt(id));
            console.log(tx.complete);
            return tx;
        })
        .then(function(tx) {
            if (tx.complete) {
                resolve(true);
                M.toast({html: 'Team deleted!'});
            } else {
                reject(new Error(tx.onerror));
            }
        })
    })
}

function getById(id) {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            const tx = db.transaction("teams", "readonly");
            const store = tx.objectStore("teams");
            console.log(store.get(id));
            return store.get(parseInt(id));
        })
        .then(function(data) {
            resolve(data);
        });
    });
}
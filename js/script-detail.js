// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
            console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
            console.log("Pendaftaran ServiceWorker gagal");
        });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}
document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
    const save = document.getElementById("save");
    if (isFromSaved) {
        save.style.display = "none";
        getSavedTeamById();
    } else {
        const item = getTeamById();
    }
    save.onclick = function() {
        console.log("Tombol diklik");
        const item = getTeamById();
        item.then(function(team) {
            saveForLater(team);
        })
    }
});
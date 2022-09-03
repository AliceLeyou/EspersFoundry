import Logger from "../../Utils/Logger";

function CleanUpUI(): void {
    Logger.Ok('Cleaning up the UI');
    const logo = document.getElementById('logo');
    if(logo) {
        logo.remove();
    }
    const leftSection = document.getElementById('ui-left');
    if(leftSection) {
        leftSection.style.paddingTop = '10px';
    }
}

export default CleanUpUI;
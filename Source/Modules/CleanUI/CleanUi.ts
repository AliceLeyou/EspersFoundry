import Logger from "../../Utils/Logger";

function CleanUpUI(): void {
    Logger.Ok("Cleaning up the UI");
    $("#logo").remove();
    $("#ui-left").css("padding-top", "10px");
}

export default CleanUpUI;
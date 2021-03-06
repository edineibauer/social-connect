function saveSocialSettings(field, value) {
    post("dashboard", "settings/saveConfig", {field: field, value: value}, function (g) {
        if (g)
            toast("erro", "warning")
    })
}

function updateSocialPosts($this) {
    post("social-connect", "social_connect/getPost", {social: $this.attr("rel")}, function (g) {
        if (!g)
            toast("Posts do " + ucFirst($this.attr("rel")) + " foram Atualizados", 4000);
        else
            location.href = g;
    });
}

$(function () {
    $(".inputConfig").off("keyup change").on("keyup change", function () {
        if ($(this).val().length === 0)
            $("#" + $(this).attr("rel") + ", #" + $(this).attr("rel") + "-re").addClass("hide");
        else
            $("#" + $(this).attr("rel") + ", #" + $(this).attr("rel") + "-re").removeClass("hide");

        saveSocialSettings($(this).attr("id"), $(this).val());
    });

    $(".space-btn-social-connect").off("click", "button-connect-social").on("click", ".button-connect-social", function () {
        updateSocialPosts($(this));
    }).off("click", "button-reconnect-social").on("click", ".button-reconnect-social", function () {
        var $this = $(this);
        toast("Reconectando...", 2000);
        saveSocialSettings('INSTAGRAM_TOKEN', '');
        setTimeout(function () {
            updateSocialPosts($this);
        }, 1400);
    });
});
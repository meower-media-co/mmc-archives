<!-- The desktop notifications -->

<script>
    import {link} from "./clmanager.js";
    import {apiUrl, encodeApiURLParams} from "./urls.js";
    // @ts-ignore
    import {sendNotification} from '@tauri-apps/api/notification';

    function listenOnLink() {
        link.on("direct", cmd => {
            if (!(cmd.val.post_origin === "home")) return;
                if (localStorage.getItem("meower_notifications") === "true") {
                    sendNotification({title: cmd.val.u, body: cmd.val.p})
                }
        })
    }
    if (link.ws.readyState === 1) {
        listenOnLink();
    } else {
        link.ws.addEventListener("open", listenOnLink);
    }
</script>
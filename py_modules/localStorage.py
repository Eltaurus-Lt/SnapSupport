from aqt.utils import tooltip

from aqt import mw, gui_hooks
import os, json

mw.addonManager.setWebExports(__name__, r"js_scripts/.*\.js$")
# addons_folder = mw.addonManager.addonsFolder()
addon_name = mw.addonManager.addonFromModule(__name__)

def storage_dump_file():
    if not mw.col or not mw.col.media: # not available during app startup
        return None
    return os.path.join(mw.col.media.dir(), "_localStorage.json")

def js_url(filename):
    return f"/_addons/{addon_name}/js_scripts/{filename}"

def inject_js(web_content, context) -> None:
    dump_path = storage_dump_file()
    if not dump_path:
        return
    try:
        with open(dump_path, "r", encoding="utf-8") as f:
            localStorage =  f.read()
    except Exception as e:
        tooltip(f"[LocalStorage] Read error: {e}")

    web_content.head += f"<script type='application/json' id='localStorage-old'>{localStorage}</script>"
    web_content.js.append(js_url("localStorage.load.js"))


gui_hooks.webview_will_set_content.append(inject_js)

/**
 *           _ _           _              _
 * __   ____| (_) __ _ ___| |_ __ _ _   _| | ___  _ __
 * \ \ / / _` | |/ _` |_  / __/ _` | | | | |/ _ \| '__|
 *  \ V / (_| | | (_| |/ /| || (_| | |_| | | (_) | |
 *   \_/ \__,_|_|\__,_/___|\__\__,_|\__, |_|\___/|_|
 *                                  |___/
 *
 * @author vdiaztaylor
 * @website https://github.com/VeronicaDiazTaylor
 *
 * NOTE:
 * このプログラムは非公式サーバーソフトウェアPocketMine-MPで稼働していたBowyersMCをScriptAPIに移植したものです。
 *
 */
import { createModalForm } from "@api/core";
import { home } from "../homeForm";
import { createTextField, createToggle } from "../componentHelper";

export function glassPaneForm() {
  return createModalForm({
    title: "BMC > §lGlass Pane§r",
    previousForm: home("utilities"),
    components: [
      createToggle(
        "GLASS_PANE.ENABLED",
        "板ガラスの破壊及び自動修復処理の有効化"
      ),
      createTextField(
        "GLASS_PANE.TYPE",
        "板ガラス (例: minecraft:glass_pane)",
        "minecraft:glass_pane",
        (newValue) => /^minecraft:([a-z_]+_)?glass_pane$/.test(newValue)
      ),
      createTextField(
        "GLASS_PANE.RECOVERY_TICKS",
        "修復されるまでにかかるティック",
        "1200",
        (newValue) => !Number.isNaN(Number(newValue))
      )
    ]
  });
}

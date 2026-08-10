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

export function movementCancelEffectForm() {
  return createModalForm({
    title: "BMC > §lMovement Cancel Effect§r",
    previousForm: home("utilities"),
    components: [
      createToggle(
        "MOVEMENT_CANCEL_EFFECT.ENABLED",
        "キャラコン無効化エフェクトの有効化"
      ),
      createTextField(
        "MOVEMENT_CANCEL_EFFECT.EFFECT_TYPE",
        "エフェクト (例: minecraft:bad_omen)",
        "minecraft:bad_omen",
        (newValue) => /^minecraft:[a-z0-9_]+$/.test(newValue)
      )
    ]
  });
}

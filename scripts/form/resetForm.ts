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
import { world } from "@minecraft/server";
import { createMessageForm } from "@api/core";
import { defaultMovementConfig } from "../main";
import { BMCOptType } from "../type/types";

export function resetForm(type: BMCOptType) {
  return createMessageForm({
    title: "BMC > §lReset§r",
    body: "ムーブメント設定を初期化しますか？",
    yes: {
      text: "はい",
      handler(player) {
        world.setDynamicProperties(defaultMovementConfig);
        player.sendMessage("データを初期化しました");
      }
    },
    no: {
      text: "いいえ",
      handler() { }
    }
  });
}

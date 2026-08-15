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
import { defaultMovementConfig, defaultUtilitiesConfig } from "../main";
import { BMCOptType } from "../type/types";

export function resetForm(type: BMCOptType) {
  let typeName;
  let config;
  switch (type) {
    case "movement":
      typeName = "ムーブメント";
      config = defaultMovementConfig;
      break;

    case "utilities":
      typeName = "ユーティリティ要素";
      config = defaultUtilitiesConfig;
      break;
  }
  return createMessageForm({
    title: "BMC > §lReset§r",
    body: typeName + "の設定を初期化しますか？",
    yes: {
      text: "はい",
      handler(player) {
        world.setDynamicProperties(config);
        player.sendMessage("データを初期化しました");
      }
    },
    no: {
      text: "いいえ",
      handler() { }
    }
  });
}

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
import { WallBounce } from "../movement/wallBounce";
import { FastStraight } from "../movement/fastStraight";
import { AirRefraction } from "../movement/airRefraction";
import { Updraft } from "../movement/updraft";
import { AirCurve } from "../movement/airCurve";
import { home } from "../form/homeForm";
import { PlayerPermissionLevel, system, world } from "@minecraft/server";
import { EventManager, Priority, repeating } from "@api/core";

// インスタンス生成
const wallBounce = new WallBounce();
const fastStraight = new FastStraight();
const airRefraction = new AirRefraction();
const updraft = new Updraft();
const airCurve = new AirCurve();

// 毎tick（20分の1秒）でプレイヤーの入力状態をチェック
repeating({
  run() {
    for (const player of world.getPlayers()) {
      wallBounce.onActivate(player);
      airRefraction.onActivate(player);
      fastStraight.onActivate(player);
      updraft.onActivate(player);
      airCurve.onActivate(player);
    }
  },
});

// 参加時にキャラコンのフラグを削除する
EventManager.registerAfter("playerSpawn", {
  handler(event) {
    if (!event.initialSpawn) return;

    const player = event.player;
    for (const propertyId of player.getDynamicPropertyIds()) {
      if (propertyId.startsWith("bmc_movement:")) {
        player.setDynamicProperty(propertyId);
      }
    }
  },
  priority: Priority.HIGHEST,
});

// アイテムからメニューの展開
EventManager.registerAfter("itemUse", {
  handler(event) {
    const item = event.itemStack;
    if (item && item.typeId === "minecraft:nether_star") {
      const player = event.source;
      if (player.playerPermissionLevel !== PlayerPermissionLevel.Operator) return;
      if (player.isSneaking) return;

      home("movement").send(player);
    }
  },
  priority: Priority.HIGHEST,
});

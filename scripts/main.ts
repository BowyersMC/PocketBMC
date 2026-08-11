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
import { system, Vector3, world } from "@minecraft/server";
import { DynamicPropertyType } from "./type/types";

/**
 * キャラコンの初期設定
 */
export const defaultMovementConfig: DynamicPropertyType = {
  "BMC_MOVEMENT_INITIALIZED_FLAG": true,

  "WALL_BOUNCE.ENABLED": true,
  "WALL_BOUNCE.COST_FOOD": 12,
  "WALL_BOUNCE.RECOVERY_FOOD": 0.25,
  "WALL_BOUNCE.HORIZONTAL_MULTIPLIER": 1.825,
  "WALL_BOUNCE.VERTICAL_MULTIPLIER": 0.775,
  "WALL_BOUNCE.WAIT_TICKS": 5,
  "WALL_BOUNCE.IGNORE_EFFECT_TYPE": "",

  "FAST_STRAIGHT.ENABLED": true,
  "FAST_STRAIGHT.COST_FOOD": 12,
  "FAST_STRAIGHT.RECOVERY_FOOD": 0.25,
  "FAST_STRAIGHT.HORIZONTAL_MULTIPLIER": 2.575,
  "FAST_STRAIGHT.VERTICAL_MULTIPLIER": 0.585,

  "AIR_REFRACTION.ENABLED": false,
  "AIR_REFRACTION.MULTIPLIER": 1.45,
  "AIR_REFRACTION.ANGLE": 85,
  "AIR_REFRACTION.WAIT_TICKS": 7,

  "UPDRAFT.ENABLED": true,
  "UPDRAFT.BLOCK": "minecraft:emerald_block",
  "UPDRAFT.HORIZONTAL_MULTIPLIER": 0.5,
  "UPDRAFT.VERTICAL_MULTIPLIER": 1.3,

  "AIR_CURVE.ENABLED": true,
  "AIR_CURVE.BLOCK": "minecraft:diamond_block",
  "AIR_CURVE.HORIZONTAL_MULTIPLIER": 1.2,
  "AIR_CURVE.VERTICAL_MULTIPLIER": 0.15,
  "AIR_CURVE.RESPONSE_COUNT": 10
};

/**
 * ユーティリティ要素の初期設定
 */
export const defaultUtilitiesConfig: DynamicPropertyType = {
  "BMC_UTILITIES_INITIALIZED_FLAG": true,

  "ARMOR.ENABLED": false,
  "ARMOR.TOLERANCE.LEATHER": -1,
  "ARMOR.TOLERANCE.GOLDEN": -1,
  "ARMOR.TOLERANCE.COPPER": -1,
  "ARMOR.TOLERANCE.CHAINMAIL": -1,
  "ARMOR.TOLERANCE.IRON": -1,
  "ARMOR.TOLERANCE.DIAMOND": -1,
  "ARMOR.TOLERANCE.NETHERITE": -1,

  "GLASS_PANE.ENABLED": false,
  "GLASS_PANE.TYPE": "minecraft:glass_pane",
  "GLASS_PANE.RECOVERY_TICKS": 1200
}

// 初回のデータ生成
system.run(() => {
  if (!world.getDynamicProperty("BMC_MOVEMENT_INITIALIZED_FLAG")) {
    world.setDynamicProperties(defaultMovementConfig);
  }
  if (!world.getDynamicProperty("BMC_UTILITIES_INITIALIZED_FLAG")) {
    world.setDynamicProperties(defaultUtilitiesConfig);
  }
});

// リスナーの呼び出し
import "./listener/movementListener";
import "./listener/utilityListener";
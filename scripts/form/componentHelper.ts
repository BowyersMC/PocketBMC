/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { slider, textField, toggle } from "@api/core";

/**
 * 変更通知のメッセージ取得
 * @param key
 * @param oldValue
 * @param newValue
 * @returns {string}
 */
function formatConfirmMessage(key: string, oldValue: unknown, newValue: unknown): string {
  return `${key} (§7${String(oldValue)}§r > §a${String(newValue)}§r)`;
}

/**
 * トグル
 * @param key
 * @param label
 */
export function createToggle(key: string, label: string) {
  return toggle({
    label: label,
    default: Boolean(world.getDynamicProperty(key)),
    handler(player, value) {
      const current = Boolean(world.getDynamicProperty(key));
      if (current !== value) {
        world.setDynamicProperty(key, value);
        player.sendMessage(formatConfirmMessage(key, current, value));
      }
    },
  });
}

/**
 * バリデータ付きテキストフィールド
 * @param key
 * @param label
 * @param placeholder
 * @param validator
 */
export function createTextField(key: string, label: string, placeholder: string, validator: (newValue: any) => boolean) {
  return textField({
    label: label,
    placeholder: placeholder,
    default: String(world.getDynamicProperty(key)),
    handler(player, value) {
      const current = world.getDynamicProperty(key);
      if (!validator(value)) {
        player.sendMessage(`${key} 不正な値を検知 (§7${String(current)}§r > §a${String(current)}§r)`);
        return;
      }

      let newValue = current;
      try {
        newValue = JSON.parse(String(value));
      } catch {
        newValue = String(value);
      }

      if (current !== newValue) {
        world.setDynamicProperty(key, newValue);
        player.sendMessage(formatConfirmMessage(key, current, newValue));
      }
    },
  });
}

/**
 * ステップスライダー
 * @param key
 * @param label
 * @param min
 * @param max
 * @param step
 */
export function createSlider(key: string, label: string, min: number, max: number, step: number = 1) {
  return slider({
    label: label,
    min: min,
    max: max,
    step: step,
    default: Number(world.getDynamicProperty(key)),
    handler(player, value) {
      const current = Number(world.getDynamicProperty(key));
      if (current !== value) {
        world.setDynamicProperty(key, value);
        player.sendMessage(formatConfirmMessage(key, current, value));
      }
    }
  });
}
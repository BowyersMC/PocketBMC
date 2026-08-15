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
import { createMessageForm, createModalForm } from "@api/core";
import { home } from "../homeForm";
import { createSlider, createTextField, createToggle } from "../componentHelper";

export function armorForm() {
  return createModalForm({
    title: "BMC > §lArmor§r",
    previousForm: home("utilities"),
    components: [
      createToggle(
        "ARMOR.ENABLED",
        "特殊鎧の有効化"
      ),
      createSlider(
        "ARMOR.TOLERANCE.LEATHER",
        "鎧(革)が受けれる回数 (-1で無制限)",
        -1,
        10,
      ),
      createSlider(
        "ARMOR.TOLERANCE.GOLDEN",
        "鎧(金)が受けれる回数 (-1で無制限)",
        -1,
        10,
      ),
      createSlider(
        "ARMOR.TOLERANCE.COPPER",
        "鎧(銅)が受けれる回数 (-1で無制限)",
        -1,
        10,
      ),
      createSlider(
        "ARMOR.TOLERANCE.CHAINMAIL",
        "鎧(チェーンメイル)が受けれる回数 (-1で無制限)",
        -1,
        10,
      ),
      createSlider(
        "ARMOR.TOLERANCE.IRON",
        "鎧(鉄)が受けれる回数 (-1で無制限)",
        -1,
        10,
      ),
      createSlider(
        "ARMOR.TOLERANCE.DIAMOND",
        "鎧(ダイヤモンド)が受けれる回数 (-1で無制限)",
        -1,
        10,
      ),
      createSlider(
        "ARMOR.TOLERANCE.NETHERITE",
        "鎧(ネザライト)が受けれる回数 (-1で無制限)",
        -1,
        10,
      ),
      createToggle(
        "ARMOR.SOUND.ENABLED",
        "特殊鎧のサウンド有効化"
      ),
      createTextField(
        "ARMOR.SOUND.TYPE_EQUIP",
        "装備サウンド",
        "random.anvil_use",
        (newValue) => /^.*$/.test(newValue)
      ),
      createTextField(
        "ARMOR.SOUND.TYPE_BURST",
        "破壊サウンド",
        "mob.zombie.woodbreak",
        (newValue) => /^.*$/.test(newValue)
      ),
      createToggle(
        "ARMOR.SOUND.SEND_TO_EQUIP",
        "装備時のサウンドを送信"
      ),
      createToggle(
        "ARMOR.SOUND.SEND_TO_ATTACKER",
        "破壊した人へサウンドを送信"
      ),
      createToggle(
        "ARMOR.SOUND.SEND_TO_VICTIM",
        "破壊された人へサウンドを送信"
      ),
    ]
  });
}

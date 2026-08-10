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

export function armorForm() {
  return createModalForm({
    title: "BMC > §lArmor§r",
    previousForm: home("utilities"),
    components: [
      createToggle(
        "ARMOR.ENABLED",
        "特殊鎧の有効化"
      ),
      createTextField(
        "ARMOR.TOLERANCE.LEATHER",
        "鎧(革)が受けれる回数 (-1で無制限)",
        "-1",
        (newValue) => !Number.isNaN(Number(newValue))
      ),
      createTextField(
        "ARMOR.TOLERANCE.GOLDEN",
        "鎧(金)が受けれる回数 (-1で無制限)",
        "-1",
        (newValue) => !Number.isNaN(Number(newValue))
      ),
      createTextField(
        "ARMOR.TOLERANCE.COPPER",
        "鎧(銅)が受けれる回数 (-1で無制限)",
        "-1",
        (newValue) => !Number.isNaN(Number(newValue))
      ),
      createTextField(
        "ARMOR.TOLERANCE.CHAINMAIL",
        "鎧(チェーンメイル)が受けれる回数 (-1で無制限)",
        "-1",
        (newValue) => !Number.isNaN(Number(newValue))
      ),
      createTextField(
        "ARMOR.TOLERANCE.IRON",
        "鎧(鉄)が受けれる回数 (-1で無制限)",
        "-1",
        (newValue) => !Number.isNaN(Number(newValue))
      ),
      createTextField(
        "ARMOR.TOLERANCE.DIAMOND",
        "鎧(ダイヤモンド)が受けれる回数 (-1で無制限)",
        "-1",
        (newValue) => !Number.isNaN(Number(newValue))
      ),
      createTextField(
        "ARMOR.TOLERANCE.NETHERITE",
        "鎧(ネザライト)が受けれる回数 (-1で無制限)",
        "-1",
        (newValue) => !Number.isNaN(Number(newValue))
      )
    ]
  });
}

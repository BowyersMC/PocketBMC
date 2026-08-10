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
import { Vector3, BlockPermutation } from "@minecraft/server";

class BlockRecovery {
  BLOCK_PERMUTATION_KEY: string = "bmc_br:permutation:";
  BLOCK_RECOVERY_KEY: string = "bmc_br:recovery:";

  /**
   * キーの生成
   *
   * @param parentKey 親のキー
   * @param location 座標
   * @returns キー
   */
  createKey(parentKey: string, location: Vector3): string {
    return parentKey + location.x + "," + location.y + "," + location.z;
  }

  /**
   * BlockPermutationをシリアライズ
   *
   * @param permutation
   * @returns JSON文字列
   */
  serializePermutation(permutation: BlockPermutation): string {
    return JSON.stringify({
      typeId: permutation.type.id,
      states: permutation.getAllStates(),
    });
  }

  /**
   * BlockPermutationをデシリアライズ
   *
   * @param serializedData JSON文字列
   * @returns BlockPermutation
   */
  deserializePermutation(serializedData: string): BlockPermutation | undefined {
    try {
      const data = JSON.parse(serializedData) as {
        typeId: string;
        states: Record<string, string | number | boolean>;
      };
      return BlockPermutation.resolve(data.typeId, data.states);
    } catch (e) {
      return undefined;
    }
  }
}

export const blockRecovery = new BlockRecovery();
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
import { BlockPermutation, EntityDamageCause, EquipmentSlot, PlayerPermissionLevel, system, world } from "@minecraft/server";
import { EventManager, Priority, repeating } from "@api/core";
import { Armor } from "../utils/armor";
import { blockRecovery as BR } from "../utils/blockRecovery";
import { home } from "../form/homeForm";

// 攻撃を喰らった時に鎧の耐久値を削る
EventManager.registerAfter("projectileHitEntity", {
  handler(event) {
    const enabled = (world.getDynamicProperty("ARMOR.ENABLED") ?? false) as boolean;
    if (!enabled) return;

    if (event.projectile.typeId !== "minecraft:arrow") return;

    const entityHitInfo = event.getEntityHit();
    const entity = entityHitInfo.entity;
    if (!entity) return;
    if (entity.typeId !== "minecraft:player") return;

    const itemStack = entity.getComponent("minecraft:equippable")?.getEquipmentSlot(EquipmentSlot.Chest).getItem();
    if (!itemStack) return;

    const armor = Armor.cast(itemStack);
    if (!armor) return;

    const newArmor = armor.decreaseDurability();
    entity.getComponent("minecraft:equippable")?.getEquipmentSlot(EquipmentSlot.Chest).setItem(newArmor);
  },
  priority: Priority.LOWEST
});

// 矢で板ガラスを壊せるようにする
EventManager.registerAfter("projectileHitBlock", {
  handler(event) {
    const enabled = (world.getDynamicProperty("GLASS_PANE.ENABLED") ?? false) as boolean;
    if (!enabled) return;

    const entity = event.projectile;
    if (entity.typeId !== "minecraft:arrow") return;

    const blockHitInfo = event.getBlockHit();
    const block = blockHitInfo.block;
    if (block.typeId !== (world.getDynamicProperty("GLASS_PANE.TYPE") ?? "minecraft:glass_pane")) return;

    entity.remove();

    const dimension = block.dimension;
    const location = block.location;
    const permutation = block.permutation;

    // 板ガラスの情報を保存
    world.setDynamicProperty(
      BR.createKey(BR.BLOCK_PERMUTATION_KEY, location),
      BR.serializePermutation(permutation)
    );
    world.setDynamicProperty(
      BR.createKey(BR.BLOCK_RECOVERY_KEY, location),
      (world.getDynamicProperty("GLASS_PANE.RECOVERY_TICKS") ?? 1200) as number
    );

    // 空ブロックの設置
    const newPermutation = BlockPermutation.resolve("minecraft:light_block", { "block_light_level": 0 });
    dimension.setBlockPermutation(location, newPermutation);

    // 破壊時の効果音
    block.dimension.playSound("random.glass", block.location);
  }
});

// 常時ティック処理: ブロックの復元
repeating({
  run() {
    const dimension = world.getDimension("minecraft:overworld");

    // 数値の減算
    const needRecovery: string[] = [];
    world.getDynamicPropertyIds().filter((it) => { return it.startsWith(BR.BLOCK_RECOVERY_KEY) }).forEach((id) => {
      let remainTicks = world.getDynamicProperty(id) as number;
      if (remainTicks > 0) {
        remainTicks -= 1;
        world.setDynamicProperty(id, remainTicks);
      } else {
        needRecovery.push(id.replace(BR.BLOCK_RECOVERY_KEY, ""));
      }
    });

    // 修復処理
    needRecovery.forEach((xyzKey) => {
      const permutationKey = BR.BLOCK_PERMUTATION_KEY + xyzKey;
      const savedData = world.getDynamicProperty(permutationKey) as string | undefined;
      if (!savedData) return;

      const permutation = BR.deserializePermutation(savedData);
      if (!permutation) return;

      const xyz = xyzKey.split(",");
      const x = Number(xyz[0]);
      const y = Number(xyz[1]);
      const z = Number(xyz[2]);
      if (!x || !y || !z) return;

      const targetBlock = dimension.getBlock({ x, y, z });
      targetBlock?.setPermutation(permutation);

      // プロパティ削除
      world.setDynamicProperty(permutationKey);
      world.setDynamicProperty(BR.BLOCK_RECOVERY_KEY + xyzKey);
    });
  }
});

// アイテムからメニューの展開
EventManager.registerAfter("itemUse", {
  handler(event) {
    const item = event.itemStack;
    if (item && item.typeId === "minecraft:nether_star") {
      const player = event.source;
      if (player.playerPermissionLevel !== PlayerPermissionLevel.Operator) return;
      if (!player.isSneaking) return;

      home("utilities").send(player);
    }
  },
  priority: Priority.HIGHEST,
});
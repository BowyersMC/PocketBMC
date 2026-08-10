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
import { ItemDurabilityComponent, ItemStack, world } from "@minecraft/server";

export abstract class Armor {
  protected static registry: Record<string, new (armor: ItemStack) => Armor> = {};
  protected TOLERANCE_KEY: string = "bmc_armor:tolerance";

  protected abstract ARMOR_TYPE: string;
  protected abstract TOLERANCE: number;

  protected armor: ItemStack | undefined;

  protected constructor(armor: ItemStack) {
    this.armor = armor;
  }

  /**
   * サブクラスをレジストリに登録するメソッド
   */
  static register(typeId: string, armorClass: new (armor: ItemStack) => Armor) {
    this.registry[typeId] = armorClass;
  }

  /**
   * ItemStack から適切な Armor インスタンスを生成して返す
   */
  static cast(itemStack: ItemStack): Armor | undefined {
    const ArmorClass = this.registry[itemStack.typeId];
    if (!ArmorClass) return undefined;

    // unbreakableじゃなければ属性付与
    const component = itemStack.getComponent("minecraft:durability");
    if (component && !component?.unbreakable) {
      component.unbreakable = true;
    }

    // インスタンス化時に itemStack を引数として渡す
    return new ArmorClass(itemStack);
  }

  /**
   * 耐久値の減少処理
   */
  decreaseDurability(): ItemStack | undefined {
    if (!this.armor) return undefined;

    // 耐えられる回数のカウント
    let remainingHits = (this.armor.getDynamicProperty(this.TOLERANCE_KEY) as number) ?? this.TOLERANCE;
    remainingHits -= 1;

    // 0以下になっていたら鎧破壊
    if (remainingHits <= 0) {
      return undefined;
    }

    // 鎧の内部耐久を保存
    this.armor.setDynamicProperty(this.TOLERANCE_KEY, remainingHits);

    return this.armor;
  }
}

export class LeatherArmor extends Armor {
  protected ARMOR_TYPE: string = "minecraft:leather_chestplate";
  protected TOLERANCE: number = (world.getDynamicProperty("ARMOR.TOLERANCE.LEATHER") ?? -1) as number;
  protected VANILLA_DURABILITY: number = 80;

  public constructor(armor: ItemStack) {
    super(armor);
  }

  static { Armor.register("minecraft:leather_chestplate", this); }
}

export class GoldenArmor extends Armor {
  protected ARMOR_TYPE: string = "minecraft:golden_chestplate";
  protected TOLERANCE: number = (world.getDynamicProperty("ARMOR.TOLERANCE.GOLDEN") ?? -1) as number;
  protected VANILLA_DURABILITY: number = 112;

  public constructor(armor: ItemStack) {
    super(armor);
  }

  static { Armor.register("minecraft:golden_chestplate", this); }
}

export class CopperArmor extends Armor {
  protected ARMOR_TYPE: string = "minecraft:copper_chestplate";
  protected TOLERANCE: number = (world.getDynamicProperty("ARMOR.TOLERANCE.COPPER") ?? -1) as number;
  protected VANILLA_DURABILITY: number = 176;

  public constructor(armor: ItemStack) {
    super(armor);
  }

  static { Armor.register("minecraft:copper_chestplate", this); }
}

export class ChainmailArmor extends Armor {
  protected ARMOR_TYPE: string = "minecraft:chainmail_chestplate";
  protected TOLERANCE: number = (world.getDynamicProperty("ARMOR.TOLERANCE.CHAINMAIL") ?? -1) as number;
  protected VANILLA_DURABILITY: number = 240;

  public constructor(armor: ItemStack) {
    super(armor);
  }

  static { Armor.register("minecraft:chainmail_chestplate", this); }
}

export class IronArmor extends Armor {
  protected ARMOR_TYPE: string = "minecraft:iron_chestplate";
  protected TOLERANCE: number = (world.getDynamicProperty("ARMOR.TOLERANCE.IRON") ?? -1) as number;
  protected VANILLA_DURABILITY: number = 240;

  public constructor(armor: ItemStack) {
    super(armor);
  }

  static { Armor.register("minecraft:iron_chestplate", this); }
}

export class DiamondArmor extends Armor {
  protected ARMOR_TYPE: string = "minecraft:diamond_chestplate";
  protected TOLERANCE: number = (world.getDynamicProperty("ARMOR.TOLERANCE.DIAMOND") ?? -1) as number;
  protected VANILLA_DURABILITY: number = 528;

  public constructor(armor: ItemStack) {
    super(armor);
  }

  static { Armor.register("minecraft:diamond_chestplate", this); }
}

export class NetheriteArmor extends Armor {
  protected ARMOR_TYPE: string = "minecraft:netherite_chestplate";
  protected TOLERANCE: number = (world.getDynamicProperty("ARMOR.TOLERANCE.NETHERITE") ?? -1) as number;
  protected VANILLA_DURABILITY: number = 592;

  public constructor(armor: ItemStack) {
    super(armor);
  }

  static { Armor.register("minecraft:netherite_chestplate", this); }
}
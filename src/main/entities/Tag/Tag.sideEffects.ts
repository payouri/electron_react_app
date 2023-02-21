import { StorageType, StorageTypeMap } from '../../lib/Storage';
import { Item } from '../Item/Item.types';
import { Tag } from './Tag.types';

export const bindTagSideEffects = ({
  tagCollection,
  itemCollection,
}: {
  tagCollection: StorageTypeMap<Tag>[StorageType.DB];
  itemCollection: StorageTypeMap<Item>[StorageType.DB];
}) => {
  tagCollection.on('itemUpdated', async (tag) => {
    const items = await itemCollection.query({
      filter: {
        'tags._id': tag._id,
      },
    });

    if (!items.length) return;

    await Promise.all(
      items.map((item) =>
        itemCollection.set(item._id, {
          ...item,
          tags: item.tags.map((itemTag) =>
            itemTag._id === tag._id ? tag : itemTag
          ),
        })
      )
    );
  });
};

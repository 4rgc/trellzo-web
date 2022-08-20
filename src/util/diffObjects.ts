import MongoObject from '../types/MongoObject';

//FIXME: add tests
export default function diffObjectArrays<T extends MongoObject>(
	current: T[],
	incoming: T[]
) {
	const objectDict: Partial<{
		[key: string]: {
			obj: T;
			isNew: boolean;
			isUpdated: boolean;
			isRemoved: boolean;
		};
	}> = {};

	for (let incomingObj of incoming) {
		// Add all incoming lists
		objectDict[incomingObj._id] = {
			obj: incomingObj,
			isNew: true,
			isUpdated: false,
			isRemoved: false,
		};
	}
	for (let currentObj of current) {
		if (!objectDict[currentObj._id]) {
			// Lists that don't exist remotely were removed
			objectDict[currentObj._id] = {
				obj: currentObj,
				isNew: false,
				isRemoved: true,
				isUpdated: false,
			};
		} else {
			// Lists that exist here and remotely either weren't changed, or were updated
			const incomingListEntry = objectDict[currentObj._id]!;
			incomingListEntry.isNew = false;
			if (
				JSON.stringify(incomingListEntry.obj) !==
				JSON.stringify(currentObj)
			) {
				incomingListEntry.isUpdated = true;
			}
		}
	}

	const added = Object.values(objectDict)
		.filter((v) => v!.isNew)
		.map((v) => v!.obj);

	const removed = Object.values(objectDict)
		.filter((v) => v!.isRemoved)
		.map((v) => v!.obj);

	const changed = Object.values(objectDict)
		.filter((v) => v!.isUpdated)
		.map((v) => v!.obj);

	return { added, removed, changed };
}

import axios from "axios";
export const onRenderCallBack = (
	id, // the "id" prop of the Profiler tree that has just committed
	phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
	actualDuration, // time spent rendering the committed update
	baseDuration, // estimated time to render the entire subtree without memoization
	startTime, // when React began rendering this update
	commitTime, // when React committed this update
	interactions // the Set of interactions belonging to this update
) => {
	console.log(
		`${id} : on ${phase} ${actualDuration} of ${baseDuration} startTime ${startTime} commitTime ${commitTime}`
    );
    console.log(id,interactions);
};

export const helperLoadData = async (link) => {
	try {
		const response = await axios.get(link);
        return response.data;
	} catch (error) {
		console.log(error);
	}
};
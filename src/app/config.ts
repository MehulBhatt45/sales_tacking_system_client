// const baseUrl = "http://132.140.160.183:4000/";
// const baseUrl = "http://206.189.231.135:4000/";
const baseUrl = "http://132.140.160.60:3000/sales";
// const baseUrl = "http://localhost:4000/";

const baseMediaUrl = "http://132.140.160.60/sales_tacking_system/server/uploads/";
// const baseMediaUrl = "http://206.189.231.135/project-mgmt-tool-server/uploads/";
export const config = {
    baseApiUrl: baseUrl,
    baseMediaUrl: baseMediaUrl,
    "priorityList": [
        { id: "1", value: 'low', colorCode: 'blue' },
        { id: "2", value: 'medium', colorCode: 'yellow' },
        { id: "3", value: 'high', colorCode: 'red' }
    ],
    "statuslist": [
        { id: "1", value: 'to do', colorCode: 'primary' },
        { id: "2", value: 'in progress', colorCode: 'info' },
        { id: "3", value: 'testing', colorCode: 'warning' },
        { id: "4", value: 'complete', colorCode: 'success' }
    ],
}


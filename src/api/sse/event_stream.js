import { baseurl } from "../axios";

export const evtSource = new EventSource(`${baseurl}/events/${sessionStorage.getItem('rasp_id')}`);

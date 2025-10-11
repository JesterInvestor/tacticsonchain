import Waypoint from '@sky-mavis/waypoint-native';
import { getWaypointOptions } from './waypointConfig';

// Export a shared waypoint instance for the app to use.
export const waypoint = new Waypoint(getWaypointOptions());

export default waypoint;

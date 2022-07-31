import mongoose from 'mongoose';
import { contextProp } from './tenant-context.js';

const dbUrl = (tenantId) => `mongodb://localhost:27017/${tenantId}`

const connectionCache = {}; // cache to store connections

export function dbConn() {
    let tenantId = contextProp('tenantId');

    let conn = connectionCache[tenantId];
    if (conn == null) {
        conn = mongoose.createConnection(dbUrl(tenantId));
        connectionCache[tenantId] =  conn;
    }

    return conn; 
};

const mongoose = require('mongoose')
import contextProp from 'tenant-context';


function connectionFactory() {
    let tenantId = contextProp('tenantId');
    let conn = mongoose.createConnection(dbUrl(tenantId));
    let Book = conn.model("Book", bookScheme);
    return conn; 
};
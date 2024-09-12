import { parseISO, format } from "date-fns";

//1990-06-15T05:00:00.00Z
function convertISOtoDisplayable (isoTimestamp) {
    if(isoTimestamp){
        // Parse it
        const parsed = parseISO(isoTimestamp)
        // Format it
        const formatted = format(parsed, "MM/dd/yyyy")

        return formatted
    }
    return isoTimestamp
}

export default convertISOtoDisplayable
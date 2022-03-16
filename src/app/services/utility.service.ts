import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable()
export class UtilityService {
    private d = new Date();

    fromDateGet() {
        this.d.setDate(this.d.getDate() - 90);
        const fromDate = formatDate(this.d, 'yyyy-MM-dd', 'en-IN');
        return fromDate;
    }

    toDateGet() {
        this.d = new Date();
        const toDate = formatDate(this.d, 'yyyy-MM-dd', 'en-IN');
        return toDate;
    }
}

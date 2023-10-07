declare  type RequestCallbacks = {
    beforeSend?: () => void;
    success?: (data: any, textStatus: string, jqXHR: JQuery.jqXHR<any>) => void;
    error?: (jqXHR: JQuery.jqXHR<any>, textStatus: string, errorThrown: string) => void;
    complete?: (jqXHR: JQuery.jqXHR<any>, textStatus: string) => void;
    statusCode?: { [key: string]: (jqXHR: JQuery.jqXHR<any>, textStatus: string) => void };
    timeout?: number;
    dataFilter?: (data: any, dataType: string) => any;
};
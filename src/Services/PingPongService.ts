const ping: string = "ping";
const pong: string = "pong";

export interface IPingPongResponse {
    success: boolean;
    statusCode: number;
    message: string;
}

export class PingPongService {
    /**
     * We will use XHR here so we do not have to rely on the modern fetch() command.
     * If we ever have problems with fetch, but not with this then we know that the
     * issue is not our fault but instead with the fetch command itself. 
     */
    static Ping(): Promise<IPingPongResponse> {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();

            request.open('GET', 'http://localhost:59402/api/PingPong/Ping?ping=ping');

            request.onload = () => {
                if (request.status == 200 && JSON.parse(request.response) == pong) {
                    resolve({
                        success: true,
                        statusCode: request.status,
                        message: JSON.parse(request.response)
                    } as IPingPongResponse);
                }
                else {
                    resolve({
                        success: false,
                        statusCode: request.status,
                        message: request.statusText
                    } as IPingPongResponse);
                }
            };

            request.onerror = () => {
                reject({
                    success: false,
                    statusCode: request.status,
                    message: request.statusText
                });
            };

            request.send();
        });
    }
}

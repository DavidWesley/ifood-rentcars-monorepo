import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { AppError } from "@/errors/AppError.ts";
import { ValidationError } from "@/errors/ValidationError.ts";
import { pinoHttpLogger } from "./PinoLogger.ts";

export class ErrorHandlerMiddleware {
    public static handle(err: Error, req: Request, res: Response, next: NextFunction) {
        let errorResponse;

        if (err instanceof ValidationError) {
            errorResponse = {
                name: err.name,
                message: err.message,
                code: err.errorCode,
                errors: err.fieldValidationErrors,
            };
        } else if (err instanceof AppError) {
            errorResponse = {
                name: err.name,
                message: err.message,
                code: err.errorCode,
            };
        } else if (err instanceof Error) {
            errorResponse = {
                name: err.name,
                message: err.message,
            };
        }

        if (!res.headersSent) {
            if (req.headers['content-type'] === 'application/json') {
                res.status((err instanceof ValidationError || err instanceof AppError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)).json(errorResponse);
                pinoHttpLogger.logger.error({err})
            } else {
                res.status((err instanceof ValidationError || err instanceof AppError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)).send(ErrorHandlerMiddleware.jsonToHtml(errorResponse));
                pinoHttpLogger.logger.error({err})
            }
        } else {
            next(err);
            pinoHttpLogger.logger.error({err})
        }
    }

    private static jsonToHtml(json: any): string {
        return `<html>
    <head>
        <style>
            @viewport {
                width: device-width;
                initial-scale: 1.0;
            }

            :root {
                --primary-color: #2c3e50;
                --secondary-color: #e74c3c;
                --background-color: #ecf0f1;
                --text-color: #34495e;
            }

            * {
                font-family: 'Roboto', sans-serif;
            }

            body {
                margin: 0;
                padding: 20px;
                background-color: var(--background-color);
            }


            .error-container {
                border: 1px solid var(--text-color);
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
                max-width: 600px;
                margin: 0 auto;
            }

            .error-name {
                font-size: 24px;
                font-weight: bold;
                color: var(--secondary-color);
                margin-bottom: 10px;
            }


            .error-message {
                font-size: 18px;
                color: var(--text-color);
            }

            @media screen and (max-width: 600px) {
                .error-container {
                    padding: 10px;
                }

                .error-name {
                    font-size: 18px;
                }

                .error-message {
                    font-size: 14px;
                }
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <div class="error-name">${json.name}</div>
            <div class="error-message">${json.message}</div>
        </div>
    </body>
</html>
`;
    }
}

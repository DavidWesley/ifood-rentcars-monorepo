import { pinoHttp } from 'pino-http';

const pinoHttpConfig = {
    formatters: {
        level: (label: string) => {
            return { severity: label.toUpperCase() };
        }
    },
    transport: {
        target: 'pino-pretty'
    },
    omitUndefined: true,
};

export const pinoHttpLogger = pinoHttp(pinoHttpConfig);
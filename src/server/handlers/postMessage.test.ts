import { describe, it, expect, jest } from '@jest/globals';
import { createRequest, createResponse } from 'node-mocks-http';
import { postMessageHandler } from './postMessageHandler';

const TEST_RESPONSE = { choices: [{ message: { content: "TEST RESPONSE" } }] };

jest.mock('openai', () => {
    return jest.fn().mockImplementation(() => ({
        chat: {
            completions: {
                create: () => TEST_RESPONSE
            },
        },
    }));
});

describe("postMessage", () => {
    it("should return message", async () => {
        const req = createRequest({
            body: {
                message: "SECOND MESSAGE",
                prevConvo: [
                    { role: "You", content: 'FIRST MESSAGE' },
                    { role: "Eman-bot", content: 'TEST RESPONSE' }
                ],
            },
        });
        const res = createResponse();

        await postMessageHandler(req, res);
        const obj = await res._getData();

        expect(obj).toEqual(JSON.stringify({
            convo: [
                { role: "You", content: 'FIRST MESSAGE' },
                { role: "Eman-bot", content: 'TEST RESPONSE' },
                { role: "You", content: 'SECOND MESSAGE' },
                { role: "Eman-bot", content: 'TEST RESPONSE' }
            ]
        }));
    });
});
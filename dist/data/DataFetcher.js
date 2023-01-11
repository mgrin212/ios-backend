"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = void 0;
const O = __importStar(require("fp-ts/Option"));
const function_1 = require("fp-ts/lib/function");
const API_URL = "https://api.isthereanydeal.com/v01";
const API_KEY = (key) => `?key=${key}`;
const makeRequest = (key, game) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/game/prices${API_KEY(key)}&plains=${game}`);
    const data = yield response.json();
    return data;
});
exports.makeRequest = makeRequest;
const mockRoot = () => {
    const root = {
        ".meta": {
            currency: "USD"
        },
        data: {
            game: {
                list: [
                    {
                        price_new: 10,
                        price_old: 20,
                        price_cut: 50,
                        url: "https://www.google.com",
                        shop: {
                            id: "1",
                            name: "Google"
                        },
                        drm: ["steam"]
                    },
                    {
                        price_new: 20,
                        price_old: 40,
                        price_cut: 50,
                        url: "https://www.amazon.com",
                        shop: {
                            id: "2",
                            name: "Amazon"
                        },
                        drm: ["steam"]
                    }
                ],
                urls: {
                    game: "https://www.google.com"
                }
            }
        }
    };
    return root;
};
//use fp-ts to create to turn mockRoot into an option
const maybeMockRoot = O.fromNullable(mockRoot());
// function that pipes the result of one getPrice into addOne
const getPriceAndAddOne = (root) => (0, function_1.pipe)(root, O.map(root => root.data), O.map(data => data.game), O.map(game => game.list), O.map(list => list[0]));

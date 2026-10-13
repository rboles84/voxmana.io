const PRINTINGS = Object.freeze({
  "calling-all-angels-giada-font-of-hope|Giada, Font of Hope": { id: "4ebc7622-08a1-4f43-92dd-8675d395e8f6", set: "fdc", collector: "4", url: "https://scryfall.com/card/fdc/4/giada-font-of-hope" },
  "keen-engineering-sai-master-thopterist|Sai, Master Thopterist": { id: "5650587a-27a5-4d68-97e2-5745627bd094", set: "fdc", collector: "5", url: "https://scryfall.com/card/fdc/5/sai-master-thopterist" },
  "wretched-ranks-ghoulcaller-gisa|Ghoulcaller Gisa": { id: "909e62fa-4585-495e-812b-5df56af24610", set: "fdc", collector: "6", url: "https://scryfall.com/card/fdc/6/ghoulcaller-gisa" },
  "reign-of-dragons-lathliss-dragon-queen|Lathliss, Dragon Queen": { id: "8a17ec4e-b508-41af-803b-32acd863e598", set: "fdc", collector: "7", url: "https://scryfall.com/card/fdc/7/lathliss-dragon-queen" },
  "tramplesaurus-rex-ghalta-primal-hunger|Ghalta, Primal Hunger": { id: "5d9951d1-3228-4d69-8e63-6e6f0a893a86", set: "fdc", collector: "8", url: "https://scryfall.com/card/fdc/8/ghalta-primal-hunger" },
  "hatsune-miku-trostani-selesnya-s-voice|Trostani, Selesnya's Voice": { id: "6ab6e6c9-fe20-40d3-997e-fe3480081f03", set: "sld", collector: "2429", url: "https://scryfall.com/card/sld/2429/trostani-selesnyas-voice" },
  "goblin-storm-zada-hedron-grinder|Zada, Hedron Grinder": { id: "b17fb671-f7ff-4633-bdef-39375c6f857c", set: "sld", collector: "2406", url: "https://scryfall.com/card/sld/2406/zada-hedron-grinder" },
  "everyone-s-invited-morophon-the-boundless|Morophon, the Boundless": { id: "58e4a55f-b35a-411a-9a05-0cbb0d767920", set: "sld", collector: "1896", url: "https://scryfall.com/card/sld/1896/morophon-the-boundless" },
  "20-ways-to-win-go-shintai-of-life-s-origin|Go-Shintai of Life's Origin": { id: "4e9a1f19-6ee3-49fb-a08d-4048ee7c1e34", set: "sld", collector: "1825", url: "https://scryfall.com/card/sld/1825/go-shintai-of-lifes-origin" },
  "from-cute-to-brute-esika-god-of-the-tree-the-prismatic-bridge|Esika, God of the Tree // The Prismatic Bridge": { id: "46d43696-3c63-4c55-bc61-e1560c8b8201", set: "sld", collector: "1155", url: "https://scryfall.com/card/sld/1155/esika-god-of-the-tree-the-prismatic-bridge" },
  "raining-cats-and-dogs-rin-and-seri-inseparable|Rin and Seri, Inseparable": { id: "a129558c-45a1-441c-97f0-b70b4e9d8a56", set: "sld", collector: "1508", url: "https://scryfall.com/card/sld/1508/rin-and-seri-inseparable-rin-and-seri-inseparable" },
  "heads-i-win-tails-you-lose-zndrsplt-eye-of-wisdom-okaun-eye-of-chaos|Zndrsplt, Eye of Wisdom": { id: "d5dfd236-b1da-4552-b94f-ebf6bb9dafdf", set: "sld", collector: "379", url: "https://scryfall.com/card/sld/379/zndrsplt-eye-of-wisdom-zndrsplt-eye-of-wisdom" },
  "heads-i-win-tails-you-lose-zndrsplt-eye-of-wisdom-okaun-eye-of-chaos|Okaun, Eye of Chaos": { id: "8421ad46-dc7f-4b66-800b-e41c30835300", set: "sld", collector: "380★", url: "https://scryfall.com/card/sld/380%E2%98%85/okaun-eye-of-chaos-okaun-eye-of-chaos" },
  "odds-and-ends-yennett-cryptic-sovereign|Yennett, Cryptic Sovereign": { id: "c4e4bcb1-e9c8-4b45-a780-986f7a38d199", set: "sld", collector: "1019", url: "https://scryfall.com/card/sld/1019/yennett-cryptic-sovereign" },
  "deathdancer-xira-xira-arien|Xira Arien": { id: "8c961265-72a8-4521-b413-0d51fd2e10ad", set: "td0", collector: "A110", url: "https://scryfall.com/card/td0/A110/xira-arien" },
  "enchantress-rubinia-rubinia-soulsinger|Rubinia Soulsinger": { id: "65a6b9a5-11d6-4f6d-a646-b1ef9c9b68aa", set: "td0", collector: "A104", url: "https://scryfall.com/card/td0/A104/rubinia-soulsinger" },
});

export function preconCommanderPrinting(precon, commanderName) {
  return PRINTINGS[`${String(precon?.slug || "")}|${String(commanderName || "")}`] || null;
}

export const PRECON_COMMANDER_PRINTINGS = PRINTINGS;

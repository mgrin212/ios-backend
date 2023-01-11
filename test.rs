use serde_derive::Deserialize;
use serde_derive::Serialize;


#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Root {
    #[serde(rename = ".meta")]
    pub meta: Meta,
    pub data: Data,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Meta {
    pub currency: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Data {
    pub game: Game,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Game {
    pub list: Vec<List>,
    pub urls: Urls,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct List {
    #[serde(rename = "price_new")]
    pub price_new: f64,
    #[serde(rename = "price_old")]
    pub price_old: f64,
    #[serde(rename = "price_cut")]
    pub price_cut: i64,
    pub url: String,
    pub shop: Shop,
    pub drm: Vec<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Shop {
    pub id: String,
    pub name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Urls {
    pub game: String,
}


//create a mock Root
const root = Root {
    meta: Meta {
        currency: "EUR".to_string(),
    },
    data: Data {
        game: Game {
            list: vec![
                List {
                    price_new: 19.99,
                    price_old: 19.99,
                    price_cut: 0,
                    url: "https://www.instant-gaming.com/en/100-buy/".to_string(),
                    shop: Shop {
                        id: "100".to_string(),
                        name: "Instant Gaming".to_string(),
                    },
                    drm: vec!["Steam".to_string()],
                },
                List {
                    price_new: 19.99,
                    price_old: 19.99,
                    price_cut: 0,
                    url: "https://www.instant-gaming.com/en/100-buy/".to_string(),
                    shop: Shop {
                        id: "100".to_string(),
                        name: "Instant Gaming".to_string(),
                    },
                    drm: vec!["Steam".to_string()],
                },
            ],
            urls: Urls {
                game: "https://www.instant-gaming.com/en/100-buy/".to_string(),
            },
        },
    },
};


//main function
fn main() {
    println!("HELLO");
}
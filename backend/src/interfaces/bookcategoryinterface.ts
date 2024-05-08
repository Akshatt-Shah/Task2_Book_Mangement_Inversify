enum BookType {
  fiction = "fiction",
  non_fiction = "non_fiction",
  romance = "romance",
  thriller = "thriller",
}

export interface BookInter {
  _id?:Number
  name: BookType; // Using the defined enum
}

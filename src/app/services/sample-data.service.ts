import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SampleDataService {
  constructor() {}

  sampleData = [
    {
      id: "zM6lWRb8iZY7WNWfImbA",
      title: 'Wheat',
      price: 520,
      category: 'Crops Seeds',
      image:
        'https://5.imimg.com/data5/YH/EO/NE/SELLER-61431003/tukdi-wheat-grains-500x500.jpg',
    },
    {
      id: "PSEhIx349RRduYA544TI",
      title: 'Peas',
      price: 520,
      category: 'Crops Seeds',
      image:
        'https://images.unsplash.com/photo-1592394533824-9440e5d68530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
    },
    {
      id: "7ZO64x7dKWk4Lmxlr5N9",
      title: 'Potato',
      price: 620,
      category: 'Crops Seeds',
      image:
        'https://5.imimg.com/data5/NO/TP/MY-61022057/potato-seed-500x500.jpg',
    },
    {
      id: "4cAWFwkM6jzoBnpyXTsO",
      title: 'Chilly',
      price: 520,
      category: 'Crops Seeds',
      image:
        'https://4.imimg.com/data4/QK/GV/MY-15581195/chilli-seeds-500x500.jpg',
    },
    {
      id: "5ehNr6l1kH3831IkQr73",
      title: 'Spinach ',
      price: 60,
      category: 'Vegetables',
      image:
        'https://previews.123rf.com/images/nito500/nito5001606/nito500160600145/60535276-closeup-of-a-bunch-of-raw-spinach-on-a-white-background.jpg',
    },
    {
      id: "yi7kl7wYepY6pUbNBVho",
      title: 'Cucumbers',
      price: 15,
      category: 'Vegetables',
      image:
        'https://cdn.mos.cms.futurecdn.net/EBEXFvqez44hySrWqNs3CZ-1024-80.jpg.webp',
    },
    {
      id: "5KWZ2ewSWhLZrN9Hquhq",
      title: 'Yellow Onion',
      price: 150,
      category: 'Vegetables',
      image:
        'https://chefsmandala.com/wp-content/uploads/2018/03/Onion-Yellow.jpg',
    },
    {
      id: "SAPQ51B8JeMtBHQnqDSQ",
      title: 'Carrot',
      price: 35,
      category: 'Vegetables',
      image:
        'https://www.jessicagavin.com/wp-content/uploads/2019/02/carrots-7-600x900.jpg',
    },
    {
      id: "TqKb4JisE8LpG8HfdPhl",
      title: 'Snow shovel ',
      price: 1000,
      category: 'Machines',
      image: 'https://sc04.alicdn.com/kf/HTB1wA9KnKuSBuNjSsplq6ze8pXah.jpg',
      rating: {
        rate: 5,
        count: 500,
      },
    },
    {
      id: "v6yWN5Bvq6cKm6NtrPzf",
      title: 'Round shovel spade',
      price: 1000,
      category: 'Machines',
      image: 'https://sc04.alicdn.com/kf/HTB1ecVfXyLxK1Rjy0Ff762YdVXam.png',
      rating: {
        rate: 5,
        count: 500,
      },
    },
    {
      id: "rXsJHMqdKE2u7SE0L9GN",
      title: 'High quality metal gardening hand tools',
      price: 2450,
      category: 'Machines',
      image:
        'https://sc04.alicdn.com/kf/Hb6f163c94459459cb00f62eb523415a81.jpg',
      rating: {
        rate: 5,
        count: 500,
      },
    },
    {
      id: "aQK3A7PAUol87sJ9yxLR",
      title: 'Garden Tool Set ',
      price: 1900,
      category: 'Machines',
      image:
        'https://sc04.alicdn.com/kf/H87fe0eea00534f699cc47825fd2affcfL.jpg',
      rating: {
        rate: 5,
        count: 500,
      },
    },
  ];

   getSampleData(){
    return this.sampleData;
  }
}

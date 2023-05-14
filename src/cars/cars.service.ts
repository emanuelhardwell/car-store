import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto';
@Injectable()
export class CarsService {
  private cars = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.filter((car) => car.id === id);
    if (!car)
      throw new NotFoundException(`No existe ningun carro con el id: ${id}`);

    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    const car = { id: uuid(), ...createCarDto };
    this.cars.push(car);

    return car;
  }
}

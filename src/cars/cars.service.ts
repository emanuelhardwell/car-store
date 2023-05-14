import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto';
import { UpdateCarDto } from './dto/update-car.dto';
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
    const car = this.cars.find((car) => car.id === id);
    if (!car)
      throw new NotFoundException(`No existe ningun carro con el id: ${id}`);

    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    const car = { id: uuid(), ...createCarDto };
    this.cars.push(car);

    return car;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);
    let carDB2;

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB2 = {
          ...carDB,
          ...updateCarDto,
          id,
        };

        return carDB2;
      }
      return car;
    });

    return carDB2;
  }
}

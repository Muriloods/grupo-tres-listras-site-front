import { UseCase } from "./UseCase";
import { Request, Response } from "express";
import { Contractor } from "../../../entities/Contractor";
import { DTO as EventsDTO } from "../../Events/Create/DTO";

export class Controller {
  constructor(
    private useCase: UseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const contractor = await this.useCase.execute(request.params.id);
      return response.status(201).send(contractor);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error."
      })
    }
  }
}
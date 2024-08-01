import { UseCase } from "./UseCase";
import { Request, Response } from "express";

export class Controller {
  constructor(
    private useCase: UseCase
  ) {}

  async handle(request: Request, response: Response) {
    try {
      const event = await this.useCase.execute(request.params.id);
      return response.status(201).send(event);
    } catch (err) {
      return response.status(400).json({
        message: err.message || "Unexpected error."
      })
    }
  }
}
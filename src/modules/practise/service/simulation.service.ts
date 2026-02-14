import { prisma } from '@/shared/config';
import { NotFoundError, BadRequestError } from '@/shared/utils';
import {
  FailSimulationResponse,
  StartSimulationResponse,
  SubmitSimulationAnswerInput,
  SubmitSimulationAnswerResponse,
  FinishSimulationResponse,
  GetSimulationQuestionResponse,
} from '../interface/practise.interface';

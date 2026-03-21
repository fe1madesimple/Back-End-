import { Request, Response, NextFunction } from 'express'
import { PodcastService } from '../service/podcast.service'
import { AppError } from '@/shared/utils'

const podcastService = new PodcastService()

export class PodcastController {

  async getAllPodcasts(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        subject,
        isBonus,
        search,
        page,
        limit,
      } = req.query

      const params = {
        subject: subject as string | undefined,
        isBonus: isBonus !== undefined ? isBonus === 'true' : undefined,
        search: search as string | undefined,
        page: page ? parseInt(page as string) : 1,
        limit: limit ? parseInt(limit as string) : 50,
      }

      const data = await podcastService.getAllPodcasts(params)

      res.status(200).json({
        success: true,
        message: 'Podcasts retrieved successfully',
        data,
      })
    } catch (error) {
      next(error)
    }
  }

  async getPodcastById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      if (!id) throw new AppError('Podcast ID is required')
      const podcast = await podcastService.getPodcastById(id)

      res.status(200).json({
        success: true,
        message: 'Podcast retrieved successfully',
        data: podcast,
      })
    } catch (error) {
      next(error)
    }
  }
}
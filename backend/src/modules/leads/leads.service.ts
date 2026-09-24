import prisma from '../../database/prisma';
import { Prisma } from '@prisma/client';

export class LeadsService {
  async getAllLeads(search?: string, status?: string) {
    const where: Prisma.LeadWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } }
      ];
    }

    return prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  async getLeadById(id: number) {
    return prisma.lead.findUnique({
      where: { id },
      include: { notes: { orderBy: { createdAt: 'desc' } } }
    });
  }

  async createLead(data: { name: string; email: string; phone: string; status?: string }) {
    return prisma.lead.create({ data });
  }

  async updateLead(id: number, data: { name?: string; email?: string; phone?: string; status?: string }) {
    return prisma.lead.update({
      where: { id },
      data
    });
  }

  async deleteLead(id: number) {
    return prisma.lead.delete({
      where: { id }
    });
  }

  async getNotesByLeadId(leadId: number) {
    return prisma.note.findMany({
      where: { leadId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createNote(leadId: number, content: string) {
    return prisma.note.create({
      data: { leadId, content }
    });
  }
}

export const leadsService = new LeadsService();

import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export interface PaginatedResult<T> {
    data: T[];
    page: number;
    size: number;
    total: number;
}
export declare class CategoriesService {
    private readonly categoryRepository;
    private readonly logger;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAll(page?: number, limit?: number): Promise<PaginatedResult<Category>>;
    findOne(id: string): Promise<Category>;
    findBySlug(slug: string): Promise<Category | null>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>;
    remove(id: string): Promise<void>;
    incrementEventCount(categoryId: string): Promise<void>;
    decrementEventCount(categoryId: string): Promise<void>;
}
